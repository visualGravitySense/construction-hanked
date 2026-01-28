@echo off
REM Скрипт для запуска парсера hanked.ee (Windows)

echo Запуск парсера hanked.ee...
cd /d %~dp0
python parsers\hanked_parser.py
pause
