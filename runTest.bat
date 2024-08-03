@echo off
:: amazing script i totally didnt write with bing ai because i have no idea how the syntax of batch works
:: Attempt to run with Node.js
node test.js
if %errorlevel% EQU 0 (
    echo Node.js executed successfully.
    exit /b
)
:: Attempt to run with Deno
deno run test.js
if %errorlevel% EQU 0 (
    echo Deno executed successfully.
    exit /b
)
:: Attempt to run with Bun (assuming you have Bun installed)
bun run test.js
if %errorlevel% EQU 0 (
    echo Bun executed successfully.
    exit /b
)
:: If none of the runtimes are available
echo Please install a valid Node.js runtime.
pause
exit /b
