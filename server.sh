#!/bin/bash

if [ ! "$(docker ps -q -f name=mongo)" ]; then 
    ./mongo.sh
fi
if [ ! "$(docker ps -q -f name=node.js)" ]; then 
    ./node.sh
fi
./start.sh
