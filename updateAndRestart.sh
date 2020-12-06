#!/bin/bash

cd build/
echo "ORQUESTRA AWS"
ls
if [ -d "build" ]; then rm -Rf build; fi
mkdir build
echo "BUILD AWS"
cd build
ls

