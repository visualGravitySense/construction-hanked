"""
Конфигурация парсера
"""

import os
from dotenv import load_dotenv

load_dotenv()

# Настройки парсера
PARSER_CONFIG = {
    'delay': float(os.getenv('PARSER_DELAY', '2.0')),  # Задержка между запросами
    'max_pages': int(os.getenv('MAX_PAGES', '5')),  # Максимальное количество страниц
    'timeout': int(os.getenv('REQUEST_TIMEOUT', '30')),  # Таймаут запросов
}

# Настройки базы данных
DATABASE_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': int(os.getenv('DB_PORT', '5432')),
    'database': os.getenv('DB_NAME', 'tender_parser'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', ''),
}

# Настройки Redis
REDIS_CONFIG = {
    'host': os.getenv('REDIS_HOST', 'localhost'),
    'port': int(os.getenv('REDIS_PORT', '6379')),
    'db': int(os.getenv('REDIS_DB', '0')),
}

# Настройки парсера hanked.ee
HANKED_CONFIG = {
    'enabled': os.getenv('HANKED_ENABLED', 'true').lower() == 'true',
    'schedule': os.getenv('HANKED_SCHEDULE', '*/30 * * * *'),  # Каждые 30 минут
    'keywords': [
        'бетон', 'betoon', 'concrete',
        'бетонные работы', 'betoonitööd',
        'фундамент', 'vundament',
        'заливка бетона', 'betooni valamine',
    ],
    'regions': ['Таллинн', 'Тарту', 'Нарва', 'Пярну'],
}
