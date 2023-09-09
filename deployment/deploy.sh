#!/usr/bin/bash
set -e # stop on error

APP_ROOT=did-web-service
APP_NAME=did-web-service

# To prevent "vite Error: ENOSPC: System limit for number of file watchers reached, watch ..."
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

cd $APP_ROOT

echo '>>>>>> start deploy & update ...'

[ ! -d "$APP_NAME" ] && git clone git@github.com:trinity-tech-io/did-web-service.git $APP_NAME

cd $APP_NAME
git pull --rebase

echo '>>>>>> Did web service source updated from git'

cd server/api
npm i --legacy-peer-deps
npx prisma migrate deploy
npx prisma generate

# list apps: pm2 list

# API
pm2 stop --silent api || true
pm2 delete api || true
pm2 --name api start npm -- start
echo '>>>>>> api done !!!'