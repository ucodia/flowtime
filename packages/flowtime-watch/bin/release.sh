#!/usr/bin/env bash

# Find relative path of script location and move to root
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )"/.. &> /dev/null && pwd )"
cd $ROOT_DIR

# Init git submodules
git submodule update --init
git -C ./second-movement submodule update --init --recursive

# Delete and create release directory
rm -rf ./release
mkdir ./release

# Build each board variant firmwares
for board in sensorwatch_red sensorwatch_green sensorwatch_blue; do
    make -C ./second-movement clean BOARD="$board" DISPLAY=classic
    make -C ./second-movement BOARD="$board" DISPLAY=classic
    cp ./second-movement/build/firmware.uf2 "./release/flowtime_watch_${board}.uf2"
done

echo "------------------------------"
echo "📦 Release created in the release/ directory"
ls ./release | xargs -I {} shasum -a 256 ./release/{}
