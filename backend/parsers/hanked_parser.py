"""
Парсер для hanked.ee (Mercell Estonia) - строительные тендеры
Специализируется на поиске тендеров по бетонным работам
"""

import requests
from bs4 import BeautifulSoup
import json
import re
from datetime import datetime
from typing import List, Dict, Optional
import time
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class HankedParser:
    """Парсер для сайта hanked.ee / mercell.com"""
    
    BASE_URL = "https://www.mercell.com"
    SEARCH_URL = f"{BASE_URL}/et-ee/tender"
    
    # Ключевые слова для поиска бетонных работ
    CONCRETE_KEYWORDS = [
        'бетон', 'betoon', 'concrete',
        'бетонные работы', 'betoonitööd',
        'фундамент', 'vundament',
        'заливка бетона', 'betooni valamine',
        'бетонирование', 'betoonimine',
        'железобетон', 'raudbetoon',
        'бетонная смесь', 'betoonisegu'
    ]
    
    # CPV коды для строительства и бетонных работ
    CONSTRUCTION_CPV_CODES = [
        '45000000',  # Строительные работы
        '45200000',  # Работы по строительству зданий
        '45210000',  # Строительство зданий
        '45220000',  # Инженерные работы
        '45230000',  # Строительные работы
    ]
    
    def __init__(self, delay: float = 2.0):
        """
        Инициализация парсера
        
        Args:
            delay: Задержка между запросами (секунды)
        """
        self.delay = delay
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'et-EE,et;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        })
    
    def fetch_page(self, url: str, params: Optional[Dict] = None) -> Optional[BeautifulSoup]:
        """
        Получение и парсинг HTML страницы
        
        Args:
            url: URL страницы
            params: Параметры запроса
            
        Returns:
            BeautifulSoup объект или None при ошибке
        """
        try:
            logger.info(f"Запрос к {url}")
            response = self.session.get(url, params=params, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'lxml')
            time.sleep(self.delay)  # Задержка между запросами
            return soup
            
        except requests.RequestException as e:
            logger.error(f"Ошибка при запросе {url}: {e}")
            return None
    
    def search_tenders(self, 
                      keywords: Optional[List[str]] = None,
                      category: Optional[str] = None,
                      region: Optional[str] = None,
                      max_pages: int = 5) -> List[Dict]:
        """
        Поиск тендеров по критериям
        
        Args:
            keywords: Список ключевых слов для поиска
            category: Категория тендеров
            region: Регион
            max_pages: Максимальное количество страниц для парсинга
            
        Returns:
            Список найденных тендеров
        """
        if keywords is None:
            keywords = self.CONCRETE_KEYWORDS
        
        all_tenders = []
        
        for page in range(1, max_pages + 1):
            logger.info(f"Парсинг страницы {page}")
            
            # Параметры поиска
            params = {
                'page': page,
            }
            
            if keywords:
                params['search'] = ' '.join(keywords[:3])  # Первые 3 ключевых слова
            
            soup = self.fetch_page(self.SEARCH_URL, params=params)
            
            if not soup:
                logger.warning(f"Не удалось загрузить страницу {page}")
                continue
            
            # Поиск тендеров на странице
            tenders = self._parse_tender_list(soup)
            
            if not tenders:
                logger.info(f"Тендеры не найдены на странице {page}, завершение")
                break
            
            all_tenders.extend(tenders)
            logger.info(f"Найдено {len(tenders)} тендеров на странице {page}")
        
        logger.info(f"Всего найдено {len(all_tenders)} тендеров")
        return all_tenders
    
    def _parse_tender_list(self, soup: BeautifulSoup) -> List[Dict]:
        """
        Парсинг списка тендеров со страницы
        
        Args:
            soup: BeautifulSoup объект страницы
            
        Returns:
            Список базовой информации о тендерах
        """
        tenders = []
        
        # Поиск элементов тендеров (структура может отличаться)
        # Пробуем разные селекторы
        tender_elements = (
            soup.find_all('div', class_=re.compile(r'tender|hanke|procurement', re.I)) or
            soup.find_all('article', class_=re.compile(r'tender|hanke', re.I)) or
            soup.find_all('li', class_=re.compile(r'tender|hanke', re.I))
        )
        
        if not tender_elements:
            # Альтернативный поиск по ссылкам
            links = soup.find_all('a', href=re.compile(r'/tender/|/hanke/', re.I))
            for link in links:
                title = link.get_text(strip=True)
                href = link.get('href', '')
                
                if title and href:
                    tender = {
                        'title': title,
                        'url': self._normalize_url(href),
                        'source': 'Hanked.ee',
                        'found_at': datetime.now().isoformat(),
                    }
                    tenders.append(tender)
        else:
            for element in tender_elements:
                tender = self._extract_tender_info(element)
                if tender:
                    tenders.append(tender)
        
        return tenders
    
    def _extract_tender_info(self, element) -> Optional[Dict]:
        """
        Извлечение информации о тендере из элемента
        
        Args:
            element: BeautifulSoup элемент
            
        Returns:
            Словарь с информацией о тендере или None
        """
        try:
            # Поиск ссылки
            link = element.find('a', href=re.compile(r'/tender/|/hanke/', re.I))
            if not link:
                return None
            
            href = link.get('href', '')
            title = link.get_text(strip=True) or element.get_text(strip=True)
            
            if not title or not href:
                return None
            
            # Поиск дополнительной информации
            deadline_elem = element.find(string=re.compile(r'deadline|tähtaeg|срок', re.I))
            deadline = deadline_elem.parent.get_text(strip=True) if deadline_elem else None
            
            value_elem = element.find(string=re.compile(r'€|EUR|сумма|summa', re.I))
            value = value_elem.parent.get_text(strip=True) if value_elem else None
            
            return {
                'title': title,
                'url': self._normalize_url(href),
                'source': 'Hanked.ee',
                'deadline': deadline,
                'value': value,
                'found_at': datetime.now().isoformat(),
            }
        except Exception as e:
            logger.error(f"Ошибка при извлечении информации о тендере: {e}")
            return None
    
    def get_tender_details(self, tender_url: str) -> Optional[Dict]:
        """
        Получение детальной информации о тендере
        
        Args:
            tender_url: URL страницы тендера
            
        Returns:
            Словарь с детальной информацией или None
        """
        soup = self.fetch_page(tender_url)
        
        if not soup:
            return None
        
        try:
            # Извлечение детальной информации
            title = self._extract_text(soup, ['h1', '.title', '.tender-title'])
            description = self._extract_text(soup, ['.description', '.content', 'main'])
            buyer = self._extract_text(soup, ['.buyer', '.customer', '.client'])
            
            # Поиск CPV кода
            cpv = self._extract_cpv(soup)
            
            # Поиск суммы
            value = self._extract_value(soup)
            
            # Поиск дат
            published_date = self._extract_date(soup, ['published', 'avaldatud'])
            deadline = self._extract_date(soup, ['deadline', 'tähtaeg', 'срок'])
            
            # Поиск региона
            region = self._extract_region(soup)
            
            # Поиск категории
            category = self._extract_category(soup)
            
            # Поиск документов
            documents = self._extract_documents(soup)
            
            return {
                'title': title,
                'description': description,
                'buyer': buyer,
                'url': tender_url,
                'source': 'Hanked.ee',
                'cpv_code': cpv,
                'value': value,
                'published_date': published_date,
                'deadline': deadline,
                'region': region,
                'category': category or 'Строительство',
                'documents': documents,
                'parsed_at': datetime.now().isoformat(),
            }
        except Exception as e:
            logger.error(f"Ошибка при парсинге деталей тендера {tender_url}: {e}")
            return None
    
    def _normalize_url(self, url: str) -> str:
        """Нормализация URL"""
        if url.startswith('http'):
            return url
        elif url.startswith('/'):
            return f"{self.BASE_URL}{url}"
        else:
            return f"{self.BASE_URL}/{url}"
    
    def _extract_text(self, soup: BeautifulSoup, selectors: List[str]) -> Optional[str]:
        """Извлечение текста по селекторам"""
        for selector in selectors:
            elem = soup.select_one(selector)
            if elem:
                return elem.get_text(strip=True)
        return None
    
    def _extract_cpv(self, soup: BeautifulSoup) -> Optional[str]:
        """Извлечение CPV кода"""
        cpv_pattern = re.compile(r'CPV[:\s]*(\d{8})', re.I)
        text = soup.get_text()
        match = cpv_pattern.search(text)
        return match.group(1) if match else None
    
    def _extract_value(self, soup: BeautifulSoup) -> Optional[str]:
        """Извлечение суммы тендера"""
        value_pattern = re.compile(r'(\d{1,3}(?:\s?\d{3})*(?:,\d{2})?)\s*€', re.I)
        text = soup.get_text()
        match = value_pattern.search(text)
        return match.group(0) if match else None
    
    def _extract_date(self, soup: BeautifulSoup, keywords: List[str]) -> Optional[str]:
        """Извлечение даты по ключевым словам"""
        for keyword in keywords:
            pattern = re.compile(f'{keyword}[:\s]*(\d{{1,2}}[./-]\d{{1,2}}[./-]\d{{2,4}})', re.I)
            text = soup.get_text()
            match = pattern.search(text)
            if match:
                return match.group(1)
        return None
    
    def _extract_region(self, soup: BeautifulSoup) -> Optional[str]:
        """Извлечение региона"""
        regions = ['Таллинн', 'Тарту', 'Нарва', 'Пярну', 'Вильянди', 
                  'Tallinn', 'Tartu', 'Narva', 'Pärnu', 'Viljandi']
        text = soup.get_text()
        for region in regions:
            if region in text:
                return region
        return None
    
    def _extract_category(self, soup: BeautifulSoup) -> Optional[str]:
        """Извлечение категории"""
        categories = {
            'бетон': 'Бетонные работы',
            'betoon': 'Бетонные работы',
            'concrete': 'Бетонные работы',
            'строительство': 'Строительство',
            'ehitus': 'Строительство',
        }
        text = soup.get_text().lower()
        for keyword, category in categories.items():
            if keyword in text:
                return category
        return None
    
    def _extract_documents(self, soup: BeautifulSoup) -> List[Dict]:
        """Извлечение ссылок на документы"""
        documents = []
        links = soup.find_all('a', href=re.compile(r'\.pdf|\.doc|\.docx', re.I))
        for link in links:
            href = link.get('href', '')
            name = link.get_text(strip=True) or 'Документ'
            documents.append({
                'name': name,
                'url': self._normalize_url(href),
            })
        return documents
    
    def filter_concrete_tenders(self, tenders: List[Dict]) -> List[Dict]:
        """
        Фильтрация тендеров по бетонным работам
        
        Args:
            tenders: Список тендеров
            
        Returns:
            Отфильтрованный список
        """
        concrete_tenders = []
        
        for tender in tenders:
            title = tender.get('title', '').lower()
            description = tender.get('description', '').lower()
            
            # Проверка ключевых слов
            text = f"{title} {description}"
            if any(keyword.lower() in text for keyword in self.CONCRETE_KEYWORDS):
                tender['category'] = 'Бетонные работы'
                tender['matched_keywords'] = [
                    kw for kw in self.CONCRETE_KEYWORDS 
                    if kw.lower() in text
                ]
                concrete_tenders.append(tender)
        
        return concrete_tenders


def main():
    """Основная функция для тестирования парсера"""
    parser = HankedParser(delay=2.0)
    
    # Поиск тендеров
    logger.info("Начало парсинга тендеров с hanked.ee")
    tenders = parser.search_tenders(
        keywords=parser.CONCRETE_KEYWORDS,
        max_pages=3
    )
    
    # Фильтрация по бетонным работам
    concrete_tenders = parser.filter_concrete_tenders(tenders)
    
    logger.info(f"Найдено {len(concrete_tenders)} тендеров по бетонным работам")
    
    # Получение деталей для первых 3 тендеров
    for i, tender in enumerate(concrete_tenders[:3], 1):
        logger.info(f"\nТендер {i}: {tender.get('title', 'Без названия')}")
        if tender.get('url'):
            details = parser.get_tender_details(tender['url'])
            if details:
                tender.update(details)
    
    # Сохранение результатов
    output_file = 'hanked_tenders.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(concrete_tenders, f, ensure_ascii=False, indent=2)
    
    logger.info(f"\nРезультаты сохранены в {output_file}")
    logger.info(f"Всего найдено: {len(concrete_tenders)} тендеров")


if __name__ == '__main__':
    main()
