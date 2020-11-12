#!/bin/bash

# create image for building react app
docker build -f frontend/build.dockerfile -t build-balance-supervisor ./frontend

# delete old website static assets
rm -rf ~/projects/nginx/websites/balance-superviser/* 

# create cointainer copy build content and remove container
docker create --name dummy-balance-supervisor build-balance-supervisor
docker cp dummy-balance-supervisor:/frontend/build/. ~/projects/nginx/websites/balance-supervisor

# cleanup
docker rm -f dummy-balance-supervisor

# do not remove image to save build time
#docker image rm build-react-app  
