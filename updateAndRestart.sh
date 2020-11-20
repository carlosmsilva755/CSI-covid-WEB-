#!/bin/bash

set -e

cd build/
ls
if [ -d "build" ]; then rm -Rf build; fi
mkdir build
cd build
ls
