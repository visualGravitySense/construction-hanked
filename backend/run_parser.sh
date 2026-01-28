#!/bin/bash
# Скрипт для запуска парсера hanked.ee

echo "Запуск парсера hanked.ee..."
cd "$(dirname "$0")"
python parsers/hanked_parser.py
