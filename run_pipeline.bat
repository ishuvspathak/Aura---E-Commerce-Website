@echo off
cls
echo ===================================================
echo   JENKINS PIPELINE LOCAL SIMULATION (AURA PROJECT)
echo ===================================================
echo.

:: STAGE 1: CHECKOUT
echo [STAGE 1/4] Checkout Source Code...
echo Checking out branch: main
git status
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git repository status check failed.
    goto fail
)
echo.
echo [STAGE 1/4] SUCCESS: Repository checked out cleanly.
echo ---------------------------------------------------
timeout /t 2 >nul

:: STAGE 2: INSTALL DEPENDENCIES
echo [STAGE 2/4] Install Dependencies...
echo Executing: npm install --legacy-peer-deps
call npm install --legacy-peer-deps
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Dependency installation failed.
    goto fail
)
echo.
echo [STAGE 2/4] SUCCESS: Dependencies installed.
echo ---------------------------------------------------
timeout /t 2 >nul

:: STAGE 3: STATIC ANALYSIS (LINT)
echo [STAGE 3/4] Static Analysis (Lint)...
echo Executing: npm run lint
call npm run lint
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Lint checking failed.
    goto fail
)
echo.
echo [STAGE 3/4] SUCCESS: Lint analysis passed.
echo ---------------------------------------------------
timeout /t 2 >nul

:: STAGE 4: BUILD ASSETS
echo [STAGE 4/4] Compile Production Build...
echo Executing: npm run build
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Production compilation failed.
    goto fail
)
echo.
echo [STAGE 4/4] SUCCESS: Production assets built.
echo ---------------------------------------------------
timeout /t 2 >nul

echo ===================================================
echo   PIPELINE SUCCESSFUL: DEPLOYMENT READY
echo ===================================================
echo.
exit /b 0

:fail
echo.
echo ===================================================
echo   PIPELINE FAILURE: BUILD CRASHED
echo ===================================================
echo.
exit /b 1
