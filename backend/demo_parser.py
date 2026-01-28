"""
Демо-скрипт для сбора 5 проектов по бетонным работам
Создает демонстрационные данные для клиента
"""

import json
import sys
import io
from datetime import datetime, timedelta
from parsers.hanked_parser import HankedParser
import logging

# Исправление кодировки для Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def create_demo_projects():
    """Создание демонстрационных проектов по бетонным работам"""
    
    demo_projects = [
        {
            "id": 1,
            "title": "Бетонные работы для жилого комплекса в Таллинне",
            "description": "Выполнение бетонных работ при строительстве жилого комплекса. Включает заливку фундамента, монолитных стен и перекрытий. Общая площадь бетонирования - 2500 м².",
            "source": "Hanked.ee",
            "category": "Бетонные работы",
            "region": "Таллинн",
            "value": "€125,000",
            "deadline": (datetime.now() + timedelta(days=15)).strftime("%Y-%m-%d"),
            "published_date": (datetime.now() - timedelta(days=5)).strftime("%Y-%m-%d"),
            "buyer": "AS Eesti Kinnisvara",
            "status": "active",
            "matched": True,
            "matched_keywords": ["бетон", "бетонные работы", "фундамент"],
            "cpv_code": "45210000",
            "url": "https://www.mercell.com/et-ee/tender/demo-1",
            "documents": [
                {"name": "Техническое задание.pdf", "url": "https://example.com/doc1.pdf"},
                {"name": "Чертежи.pdf", "url": "https://example.com/doc2.pdf"}
            ],
            "found_at": datetime.now().isoformat(),
            "parsed_at": datetime.now().isoformat()
        },
        {
            "id": 2,
            "title": "Заливка бетонного фундамента для административного здания",
            "description": "Бетонные работы по устройству фундамента административного здания в Тарту. Требуется заливка монолитного фундамента площадью 800 м², класс бетона B25.",
            "source": "Hanked.ee",
            "category": "Бетонные работы",
            "region": "Тарту",
            "value": "€85,000",
            "deadline": (datetime.now() + timedelta(days=22)).strftime("%Y-%m-%d"),
            "published_date": (datetime.now() - timedelta(days=3)).strftime("%Y-%m-%d"),
            "buyer": "Tartu Linnavalitsus",
            "status": "active",
            "matched": True,
            "matched_keywords": ["бетон", "фундамент", "заливка бетона"],
            "cpv_code": "45220000",
            "url": "https://www.mercell.com/et-ee/tender/demo-2",
            "documents": [
                {"name": "Проектная документация.pdf", "url": "https://example.com/doc3.pdf"}
            ],
            "found_at": datetime.now().isoformat(),
            "parsed_at": datetime.now().isoformat()
        },
        {
            "id": 3,
            "title": "Бетонные работы по реконструкции дорожного покрытия",
            "description": "Выполнение бетонных работ при реконструкции участка автомобильной дороги в Нарве. Включает демонтаж старого покрытия, подготовку основания и заливку нового бетонного покрытия толщиной 25 см.",
            "source": "Hanked.ee",
            "category": "Бетонные работы",
            "region": "Нарва",
            "value": "€250,000",
            "deadline": (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d"),
            "published_date": (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d"),
            "buyer": "Narva Linna Tööstus",
            "status": "active",
            "matched": True,
            "matched_keywords": ["бетон", "бетонные работы", "бетонирование"],
            "cpv_code": "45233140",
            "url": "https://www.mercell.com/et-ee/tender/demo-3",
            "documents": [
                {"name": "Технические условия.pdf", "url": "https://example.com/doc4.pdf"},
                {"name": "Схема участка.pdf", "url": "https://example.com/doc5.pdf"}
            ],
            "found_at": datetime.now().isoformat(),
            "parsed_at": datetime.now().isoformat()
        },
        {
            "id": 4,
            "title": "Устройство железобетонных конструкций для складского комплекса",
            "description": "Бетонные работы по устройству железобетонных колонн, балок и перекрытий складского комплекса в Пярну. Объем бетонных работ - 1200 м³. Класс бетона B30.",
            "source": "Hanked.ee",
            "category": "Бетонные работы",
            "region": "Пярну",
            "value": "€180,000",
            "deadline": (datetime.now() + timedelta(days=18)).strftime("%Y-%m-%d"),
            "published_date": (datetime.now() - timedelta(days=2)).strftime("%Y-%m-%d"),
            "buyer": "Pärnu Kaubanduskeskus OÜ",
            "status": "active",
            "matched": True,
            "matched_keywords": ["железобетон", "бетонные работы", "бетон"],
            "cpv_code": "45210000",
            "url": "https://www.mercell.com/et-ee/tender/demo-4",
            "documents": [
                {"name": "Рабочая документация.pdf", "url": "https://example.com/doc6.pdf"},
                {"name": "Спецификация.pdf", "url": "https://example.com/doc7.pdf"}
            ],
            "found_at": datetime.now().isoformat(),
            "parsed_at": datetime.now().isoformat()
        },
        {
            "id": 5,
            "title": "Бетонирование монолитных стен и перекрытий офисного здания",
            "description": "Выполнение бетонных работ по устройству монолитных несущих стен и перекрытий 5-этажного офисного здания в Таллинне. Площадь бетонирования - 3200 м². Требуется использование бетононасоса.",
            "source": "Hanked.ee",
            "category": "Бетонные работы",
            "region": "Таллинн",
            "value": "€195,000",
            "deadline": (datetime.now() + timedelta(days=25)).strftime("%Y-%m-%d"),
            "published_date": (datetime.now() - timedelta(days=4)).strftime("%Y-%m-%d"),
            "buyer": "Tallinna Ärikeskus AS",
            "status": "active",
            "matched": True,
            "matched_keywords": ["бетон", "бетонирование", "монолитные стены"],
            "cpv_code": "45210000",
            "url": "https://www.mercell.com/et-ee/tender/demo-5",
            "documents": [
                {"name": "Архитектурный проект.pdf", "url": "https://example.com/doc8.pdf"},
                {"name": "Конструктивный проект.pdf", "url": "https://example.com/doc9.pdf"},
                {"name": "Смета.pdf", "url": "https://example.com/doc10.pdf"}
            ],
            "found_at": datetime.now().isoformat(),
            "parsed_at": datetime.now().isoformat()
        }
    ]
    
    return demo_projects


def main():
    """Основная функция для создания демо-данных"""
    
    logger.info("Создание демонстрационных данных для клиента...")
    logger.info("Сбор 5 проектов по бетонным работам")
    
    # Создание демо-проектов
    projects = create_demo_projects()
    
    # Сохранение в JSON файл
    output_file = 'hanked_tenders_demo.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(projects, f, ensure_ascii=False, indent=2)
    
    logger.info(f"\n✅ Успешно создано {len(projects)} проектов по бетонным работам")
    logger.info(f"📄 Результаты сохранены в файл: {output_file}")
    
    # Вывод краткой информации
    try:
        print("\n" + "="*60)
        print("DEMO PROJECTS - CONCRETE WORK")
        print("="*60)
        
        for i, project in enumerate(projects, 1):
            print(f"\n{i}. {project['title']}")
            print(f"   Region: {project['region']}")
            print(f"   Value: {project['value']}")
            print(f"   Deadline: {project['deadline']}")
            print(f"   Buyer: {project['buyer']}")
            print(f"   Status: {'MATCHED' if project['matched'] else 'NO MATCH'}")
        
        total_value = sum(int(p['value'].replace('€', '').replace(',', '')) for p in projects)
        print("\n" + "="*60)
        print(f"Total projects: {len(projects)}")
        print(f"Total value: €{total_value:,}")
        print("="*60)
    except Exception as e:
        logger.info(f"Output summary: {len(projects)} projects created")
    
    return projects


if __name__ == '__main__':
    main()
