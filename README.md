# Capture

A very simple screenshot service.

## Components

* NodeJS
* Express
* PhantomJS
* Docker

## Docker

**Dev mode**

1. docker build -t aurer/capture .
2. docker run -it --rm -p 3000:3000 -v $(pwd)/app:/srv aurer/capture
3. npm run start-dev

**Production mode**

1. docker build -t aurer/capture .
2. docker run -d -p 3000:3000 --name capture aurer/capture npm start
