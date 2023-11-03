1. Inicializar rede do docker, para conectar container Node.js com container MongoDB (banco de dados)

    docker network create ea202

Se já foi inicalizada uma vez, provavelmente não vai precisar de novo. É possível checar com o comando

    docker network ls

2. Script responsável pela criação de um container Node.js, com o comando

    docker run (args...)

Ao executar o script ele irá mostrar um código.
Podemos verificar se foi iniciado corretamente checando a lista de containers com

    docker ps

3. Entrar no container Node.js e prepara para as instalações dos pacotes via npm.

    docker exec -it node.js bash

4. Instala express e express-generator.

    npm install -g express express-generator

O Express é um pacote JavaScript que provê funcionalidades REST, ou seja, permite a construção de pontos de acesso do tipo GET, POST, PUT e DELETE.

4. (Dentro do container) Cria uma aplicação usando o express

    express AppTeste

Isso vai criar uma pasta AppTeste/ com subpastas: bin, public, routes, view e um arquivo app.js

5. (Dentro do container) Troca a autoria do diretório criado. Para que o usuário consiga editar os arquivos dentro de AppTeste/

    chown -R node AppTeste/

6. (Dentro do container) Instalar as dependências da aplicação criada rodando

    cd AppTeste/ && npm install

7. (Dentro do container na pasta AppTeste) Rodar a aplicação com

    npm start

Deve ser possível acessar uma página HTML com localhost:port e eventuais caminhos como localhost:port/users

8. (Dentro do container)  Instalar mongoose que é a interface para o MongoDB que será usada pelo Node.js

    npm install mongoose

9. Script para iniciar container do Mongo. Ele deve criar uma pasta mongo_data.

10. Quando ambos containers estão rodando, basta usar

    ./start.sh

que executa os comandos no container Node:

    cd AppTeste
    npm start

11. Script para iniciar servidor ./server.sh quando estiver tudo desligado deve rodar
    
    ./mongo.sh
    ./node.sh
    ./start.sh

12. Devemos criar um banco de dados e para isso devemos inserir um modelo na pasta models (que ainda precisa ser criada)

12.1. Quando um modelo for ser usado, é preciso incluir o modelo no arquivo .js com

    var funcionariosDB = require('../models/funcionarios');