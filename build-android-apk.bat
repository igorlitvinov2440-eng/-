@echo off
chcp 65001 >nul
echo =======================================================
echo   Сборка My Player APK для Android
echo =======================================================
echo.

if not exist node_modules (
    echo [1/4] Установка зависимостей (npm install)...
    call npm install
    if %errorlevel% neq 0 (
        echo Ошибка при установке зависимостей!
        pause
        exit /b %errorlevel%
    )
) else (
    echo [1/4] Зависимости уже установлены.
)

echo [2/4] Компиляция веб-версии...
call npm run build

echo [3/4] Синхронизация файлов в Android проект (Capacitor)...
call npx cap sync android

echo [4/4] Сборка APK пакета с помощью Gradle...
cd android
call gradlew.bat assembleDebug
cd ..

if %errorlevel% neq 0 (
    echo.
    echo [ОШИБКА] Не удалось собрать APK.
    echo Убедитесь, что установлена Java JDK (версии 17 или выше) и настроена переменная JAVA_HOME.
    echo Также проект можно открыть в Android Studio: npx cap open android
    pause
    exit /b %errorlevel%
)

if not exist release mkdir release
if exist "android\app\build\outputs\apk\debug\My Player.apk" (
    copy /y "android\app\build\outputs\apk\debug\My Player.apk" "release\My Player.apk" >nul
) else if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
    copy /y "android\app\build\outputs\apk\debug\app-debug.apk" "release\My Player.apk" >nul
    copy /y "android\app\build\outputs\apk\debug\app-debug.apk" "android\app\build\outputs\apk\debug\My Player.apk" >nul
)

echo.
echo =======================================================
echo   УСПЕХ! APK успешно скомпилирован!
echo   Готовый файл: release\My Player.apk
echo =======================================================
echo.

if exist release (
    explorer release
) else if exist android\app\build\outputs\apk\debug (
    explorer android\app\build\outputs\apk\debug
)

pause
