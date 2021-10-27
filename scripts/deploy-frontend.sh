#!/bin/bash

# create image for building react app
docker build -f frontend/build.dockerfile -t build-balance-supervisor-frontend ./frontend

# delete old website static assets
rm -rf ~/projects/nginx/websites/balance-superviser/* 

# create cointainer copy build content and remove container
docker create --name dummy-balance-supervisor-frontend build-balance-supervisor-frontend
docker cp dummy-balance-supervisor-frontend:/frontend/build/. ~/projects/nginx/websites/balance-supervisor

# cleanup
docker rm -f dummy-balance-supervisor-frontend

# do not remove image to save build time
#docker image rm build-balance-supervisor-frontend
