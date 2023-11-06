# Exemplo MEVN

## Pré-requisitos:

- Docker
    - Imagem com mongoDB
    - Imagem com nodeJS
    - Network Docker: `docker network create ea202`
- WSL ou Linux

## Execução

Como rodar a aplicação

1. Instalar pacotes

    ```bash
    ./node.sh
    docker exec -it node.js bash

    # Dentro do container...
    cd AppTeste
    npm install
    ```

    ou simplesmente rodar

    ```bash
    ./setup
    ```

2. Inicializar containers e a aplicação com

    ```bash
    ./server.sh
    ```

3. Acessar o endereço `localhost:3000`