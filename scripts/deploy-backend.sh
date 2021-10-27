#!/bin/bash

# copy .env file to backend root
rm ./backend/.env
cp ~/projects/github/secrets/balance-supervisor-env ./backend/.env

# remove containers
docker-compose -f ~/projects/github/balanceSupervisor/backend/docker-compose.yml down  --rmi local

# create new containers
docker-compose -f ~/projects/github/balanceSupervisor/backend/docker-compose.yml up -d --build
