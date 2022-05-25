# Spafe Monitor

![banner](https://user-images.githubusercontent.com/102171209/166430504-dea80430-5dd3-43c8-a817-027d7ee5a799.jpeg)

This is a project carried out by Group 5 in II1302 (Spring 2022) at KTH Royal Institute of Technology.

## The project

### Background

An imaginary customer wants a cloud-based system for monitoring air quality / temperature. They want to be able to put out sensors in different rooms and connect them all to a common service in the cloud, where the data is displayed.

### Purpose

The overall purpose of this project is to protect human health and equipment. The product can provide incentives to lower the concentration of harmful gases in the workplace to improve the work environment.
The project will also give the group experience in projects and system development.

### Goal

The main goal is to develop a functioning system that meets the requirements. Some sub-goals are: a functional sensor module, integration with the cloud and a functioning web interface.

## More information about the project can be found at the links below

- [**Project definition**](https://docs.google.com/document/d/1rXNqcs8TPbTrrVb3CHk2G23qbBTXSn_r/edit?usp=sharing&ouid=116612736843125590387&rtpof=true&sd=true)
- [**Vision document**](https://docs.google.com/document/d/1SJ3QUOX1WJSA_hTGWOLoi91-rVT0jSy1/edit?usp=sharing&ouid=116612736843125590387&rtpof=true&sd=true)
- [**GANTT**](https://docs.google.com/spreadsheets/d/1jiP1j_vhUTtjraDfo97tL9Ur1a-9HIi9/edit?usp=sharing&ouid=116612736843125590387&rtpof=true&sd=true)
- [**Work board**](https://lucid.app/lucidchart/6948f29b-8651-49a3-b143-13c3a75f0af6/edit?invitationId=inv_3b2fd53b-1783-43ff-a65f-f7bd058c15f3)
- More about the iterations of the project can be found on the [**Wiki**](https://github.com/jonaro00/II1302/wiki)

## Members

- Alexander: Project leader and Environment responsible
- Johan: Architect
- Amiran: Developer
- Bashar: Tester
- Simon: Requirement responsible

## Development

To develop, start by cloning this repository.

### Webpage

To develop the webpage, do the following:

- Install Node and npm.
- From the root directory, run `npm install`. This installs all dependencies, including those of the `web/` subpackage, into `node_modules/`.
- Set up the files `web/.env.local` (for development), and `web/.env.test.local` (for testing) with the correct credentials. `web/.env.local.example` can be used as a template. ⚠ Do not commit your secrets.
- `npm run dev` to start a live development server on localhost.
- Develop. 😎
- `npm test` to run all unit tests.
- The `.husky/pre-commit` git hook runs Prettier and ESLint on any staged files before every commit.

### Hardware

The required hardware is:

- AZ Envy (+ USB A to micro B cable)
- FT232RL FTDI USB to TTL adapter (+ USB A to mini B cable)
- Cables for connecting the programming pins (breadboard optional)

![hardware programming](https://user-images.githubusercontent.com/102171209/169543060-1fcd0bf5-5d8a-4af6-afde-b08cfbedcf28.jpeg)

To develop the hardware:

- Install Arduino IDE.
- Connect all hardware as shown above. The USB mini B should be connected to your computer.
- Install any drivers needed. The board should show up on a serial port.
- Install libraries in Arduino IDE:
  - In Preferences, add `http://arduino.esp8266.com/stable/package_esp8266com_index.json` to Additional boards manager URLs.
  - In Board Manager, search for and install package `esp8266` (<https://github.com/esp8266/Arduino>).
  - In Library Manager, search for and install:
    - `Azure SDK for C` (<https://github.com/Azure/azure-sdk-for-c/>)
    - `PubSubClient` (<https://pubsubclient.knolleary.net/>)
  - Download these repositories as zip files (Code -> Download ZIP) and add them in (Sketch -> Include Library -> Add .ZIP Library...).
    - <https://github.com/jonaro00/SHT3x>
    - <https://github.com/labay11/MQ-2-sensor-library>
- Select the correct board type in (Tools -> Boards -> ESP8266 Boards -> Generic ESP8266 Module).
- Select the correct port in (Tools -> Port -> ...).
- Develop. 😎
- Use the relevant `config.example.h` as a template to create a `config.h` file with correct credentials.
- To upload the sketch:
  - Click Upload and wait for the Output to write `Connecting.....`.
  - Put the board into programming mode:
    - Press and hold down the RESET button, then the FLASH button.
    - Then release RESET and finally release FLASH.
  - After uploading you have to leave programming mode: Press RESET shortly.

## Testing

The Webpage is continuosly tested in GitHub Actions. This is the latest status:

[![Build and Test npm package](https://github.com/jonaro00/II1302/actions/workflows/test.yml/badge.svg)](https://github.com/jonaro00/II1302/actions/workflows/test.yml)
