#!/bin/bash

if [ "$(docker ps -q -f name=mongo)" ]; then 
    docker stop mongo
fi
if [ "$(docker ps -q -f name=node.js)" ]; then 
    docker stop node.js
fi