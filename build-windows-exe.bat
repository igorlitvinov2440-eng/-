@echo off
chcp 65001 >nul
echo =======================================================
echo   Сборка My Player для Windows (.exe)
echo =======================================================
echo.

if not exist node_modules (
    echo [1/3] Установка зависимостей (npm install)...
    call npm install
    if %errorlevel% neq 0 (
        echo Ошибка при установке зависимостей!
        pause
        exit /b %errorlevel%
    )
) else (
    echo [1/3] Зависимости уже установлены.
)

echo [2/3] Сборка веб-приложения и Electron приложения...
call npm run build:win

if %errorlevel% neq 0 (
    echo.
    echo [ОШИБКА] Сборка не удалась. Проверьте сообщения выше.
    pause
    exit /b %errorlevel%
)

echo.
echo =======================================================
echo   УСПЕХ! Сборка завершена!
echo   Файлы .exe находятся в папке "release":
echo   - My Player Setup.exe (Установщик с ярлыком)
echo   - My Player.exe (Портативная версия без установки)
echo =======================================================
echo.

if exist release (
    explorer release
)

pause
