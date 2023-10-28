#! /bin/bash

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

docker run \
-it \
--name mongo \
--rm \
-d \
-h mongo \
--net=ea202 \
-v "${SCRIPTPATH}"/mongo_data:/data/db \
mongo:latest

