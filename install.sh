#!/bin/bash

npm install -g express express-generator

express AppAutent

cd AppAutent/

mkdir models
cp ../Exemplos/mongo.js models
cp ../Exemplos/index.js routes
cp ../Exemplos/login.html .
cp ../Exemplos/index.html .

npm install mongoose
npm install

cd ..
chown -R 1001 AppAutent/