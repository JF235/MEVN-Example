#!/bin/bash

# Verifique se o número correto de argumentos foi fornecido
if [ $# -ne 4 ]; then
  echo "Uso: $0 <cpf> <senha> <nome> <cargo>"
  exit 1
fi

# Defina as variáveis com base nos argumentos
cpf="$1"
senha="$2"
nome="$3"
cargo="$4"

mongo_script=$(cat <<EOF
use loginsDB
db.logins.insertOne({cpf: "$cpf", senha:"$senha", nome:"$nome", cargo:"$cargo"})
EOF
)

docker exec -it mongo bash -c "echo '$mongo_script' | mongosh" > /dev/null