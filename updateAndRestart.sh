#!/bin/bash


set -e

cd build/
echo "COVID AWS"
ls
if [ -d "build" ]; then rm -rf build; fi
mkdir build
echo "BUILD AWS"
cd build
ls

