# Flowtime Watch 🌀

The Flowtime Watch is an implementation of the [Flowtime](https://github.com/Ucodia/flowtime) on a classic Casio watch.

This project is built as the `flowtime` branch on a fork of [Second Movement](https://github.com/ucodia/second-movement/tree/flowtime).

## Dependencies

To build this project, you need to install the `arm-none-eabi` variant of the Arm GNU Toolchain on your machine: [Arm GNU Toolchain Downloads](https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads)

## Building

After cloning this repository, pull the `second-movement` submodule and its own submodules:

```
git submodule update --init
git -C ./second-movement submodule update --init --recursive
```

Find which Sensor Watch board you are building for and run the following command from inside the `second-movement` directory:

```
cd second-movement
make BOARD=sensorwatch_red DISPLAY=classic
```

Valid `BOARD` values are: `sensorwatch_pro`, `sensorwatch_green`, `sensorwatch_red`, `sensorwatch_blue`

Valid `DISPLAY` values are: `classic`, `custom`

## Testing

To test in the emulator, run the following command from inside the `second-movement` directory:

```
cd second-movement
emmake make BOARD=sensorwatch_red DISPLAY=classic
python3 -m http.server -d build-sim
```

The emulator should be available at http://localhost:8000/firmware.html

## Flashing

To flash your Sensor Watch with the Flowtime watch firmware, copy the `second-movement/build/firmware.uf2` firmware file to your board, or run `make install` from the `second-movement` directory. Read more in the official [Sensor Watch documentation](https://www.sensorwatch.net/docs/firmware/flashing/).

## Releasing

To create a release of the firmware, simply run the command `bin/release.sh`.
