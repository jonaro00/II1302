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

## If you are interested in the project, look further at the links below:

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

### Webpage

To develop the webpage, do the following:

- Install Node and npm.
- From the root directory, run `npm install`. This installs all dependencies, including those of the `web/` subpackage, into `node_modules/`.
- `npm run dev` to start a live development server on localhost.
- Develop. 😎
- `npm test` to run all unit tests.
- The `.husky/pre-commit` git hook runs Prettier and ESLint on any staged files before every commit.

### Hardware

The required hardware is:

- AZ Envy (+ USB A to micro B)
- FT232RL FTDI USB to TTL adapter (+ USB A to mini B)
- Cables for connecting the programming pins (breadboard optional)

![hardware programming](https://user-images.githubusercontent.com/102171209/169543060-1fcd0bf5-5d8a-4af6-afde-b08cfbedcf28.jpeg)

To develop the hardware:

- Install Arduino IDE.
- Connect all hardware as shown above.
- Select the correct board type in (... -> ... -> )
- Select the correct port in (... -> ...)
- Develop. 😎

To put the board into programming mode:
- Press the RESET button, then the FLASH button.
- Then release RESET and finally release FLASH. 
- After uploading you have to leave the programming mode, so press RESET shortly.

## Testing

The Webpage is continuosly tested in GitHub Actions. This is the latest status:

[![Build and Test npm package](https://github.com/jonaro00/II1302/actions/workflows/test.yml/badge.svg)](https://github.com/jonaro00/II1302/actions/workflows/test.yml)
