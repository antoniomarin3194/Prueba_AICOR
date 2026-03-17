@echo off

echo Actualizando rama main...
git checkout main
git pull origin main

echo.

set branches=authentication dashboard notifications orders payments products reports settings shopping-cart

for %%b in (%branches%) do (
echo ---------------------------
echo Actualizando feature/%%b
git checkout feature/%%b
git merge main
git push
)

echo.
echo Volviendo a main...
git checkout main

echo.
echo Todas las ramas feature han sido actualizadas.
pause
