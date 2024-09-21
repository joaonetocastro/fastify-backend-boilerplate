#!/bin/sh
yarn
yarn prisma:generate
yarn prisma:migrate:deploy
yarn dev