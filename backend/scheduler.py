"""
Планировщик задач для автоматического запуска парсеров
"""

import schedule
import time
import logging
from datetime import datetime
from parsers.hanked_parser import HankedParser
from config import HANKED_CONFIG, PARSER_CONFIG

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def run_hanked_parser():
    """Запуск парсера hanked.ee"""
    try:
        logger.info(f"Запуск парсера hanked.ee в {datetime.now()}")
        
        parser = HankedParser(delay=PARSER_CONFIG['delay'])
        
        # Поиск тендеров
        tenders = parser.search_tenders(
            keywords=HANKED_CONFIG['keywords'],
            max_pages=PARSER_CONFIG['max_pages']
        )
        
        # Фильтрация по бетонным работам
        concrete_tenders = parser.filter_concrete_tenders(tenders)
        
        logger.info(f"Найдено {len(concrete_tenders)} тендеров по бетонным работам")
        
        # TODO: Сохранение в базу данных
        # TODO: Отправка уведомлений
        
        return concrete_tenders
        
    except Exception as e:
        logger.error(f"Ошибка при выполнении парсера hanked.ee: {e}")
        return []


def setup_scheduler():
    """Настройка планировщика задач"""
    if HANKED_CONFIG['enabled']:
        schedule.every(30).minutes.do(run_hanked_parser)
        logger.info("Планировщик настроен: парсер hanked.ee будет запускаться каждые 30 минут")
    
    # Можно добавить другие парсеры
    # schedule.every(1).hours.do(run_riigihangete_parser)
    # schedule.every(1).hours.do(run_eprocurement_parser)


def run_scheduler():
    """Запуск планировщика в бесконечном цикле"""
    setup_scheduler()
    
    logger.info("Планировщик запущен. Ожидание задач...")
    
    while True:
        schedule.run_pending()
        time.sleep(60)  # Проверка каждую минуту


if __name__ == '__main__':
    # Для тестирования можно запустить сразу
    # run_hanked_parser()
    
    # Для продакшена - запуск планировщика
    run_scheduler()
