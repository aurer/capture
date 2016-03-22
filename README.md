# Capture

A very simple screenshot service.

## Components

* NodeJS
* Express
* PhantomJS
* Docker

## Docker

To run this container use the following commands

1. docker build -t aurer/capture .
2. docker run -d -p 3000:3000 --name capture aurer/capture npm start
