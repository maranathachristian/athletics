@echo off
setlocal enabledelayedexpansion

echo Initializing client
cd "client"
call yarn

echo Initializing server
cd "..\server"
call go mod tidy

echo Initialization done.