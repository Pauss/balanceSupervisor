#!/bin/bash

# before deploy
git pull
git status
sudo service nginx stop

# deploy backend
./scripts/deploy-backend.sh
./scripts/deploy-frontend.sh

# After deploy
sudo service nginx start