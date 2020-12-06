#!/bin/bash


set -e

cd build/
echo "COVID AWS"
ls
if [ -d "build" ]; then rm -Rf build; fi
mkdir build
echo "BUILD AWS"
cd build
ls

