# Express

## Obtendo a página `index.html`

Após gerar o projeto com *express generator*, adicionar o arquivo `routes/index.js` com o roteador em `app.js`.

```js
// app.js

var indexRouter = require('./routes/index'); // Extensão .js pode ser suprimida
```

Em `routes/index.js`, vou escrever a função que trata uma requisição do tipo *GET* na raíz, como

```http
GET / HTTP/1.1
...
```

Para isso devo preparar a resposta da requisição (parâmetro `res` da função `sendIndexFile`) e enviar o arquivo com `sendFile`.

```js
// routes/index.js

var express = require('express');
var router = express.Router();

/* Método para obter página AppTeste/index.html */
function sendIndexFile(req, res) {  // GET
  var path = 'index.html';
  res.header('Cache-Control', 'no-cache');
  res.sendFile(path, { "root": "./" });
}

router.route('/')
  .get(sendIndexFile);

module.exports = router;
```
    
## Redirecionando para outra página

Vou começar adicionando um tratador da nova rota "/funcionarios" no `app.js`

```js
// app.js

var funcionariosRouter = require('./routes/funcionarios')
app.use('/funcionarios', funcionariosRouter);
```

Em seguida vou criar o tratador de rotas em `./routes/funcionarios.js`. Na primeira iteração, desse projeto vou somente devolver uma resposta com uma string "Funcionarios" de conteúdo.

```js
// routes/funcionarios.js

var express = require('express');
var router = express.Router();

var funcionariosDB = require('../models/funcionarios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Funcionarios');
});

module.exports = router;
```

Na parte do frontend, `index.html`, vou adicionar um link com um tratador de eventos do tipo `@click` que invoca o método `goToFuncionarios`, responsável por abrir a outra página na mesma aba.

```html
<body>
    <div id="app">
        ...

        <div id="menu">
            <a class="link" @click="doGoToFunc">Funcionários</a>
        </div>
    </div>

    <script>
        async function goToFuncionarios() {
            window.open("/funcionarios", "_self");
        }

        var app = new Vue({
            el: '#app',
            data: {
            },
            methods: {
                doGoToFunc: goToFuncionarios,
            }
        })
    </script>
</body>
```

Agora se eu quero que a nova janela seja o formulário de `funcionarios.html`, vou editar o conteúdo da resposta no `funcionarios.js` e adicionar o método `sendFile`.

```js
// routes/funcionarios.js

var express = require('express');
var router = express.Router();

var funcionariosDB = require('../models/funcionarios');

function sendFuncionariosFile(req, res) {  // GET
  var path = 'funcionarios.html';
  res.header('Cache-Control', 'no-cache');
  res.sendFile(path, { "root": "./" });
}

router.route('/')
  .get(sendFuncionariosFile);

module.exports = router;
```

## Arquivos Estáticos

O projeto express permite retornar diretamente arquivos estáticos presentes no diretório `public/`. Isso foi configurado em `app.js`

```js
// app.js

// Obtém os arquivos estáticos em public/ por padrão
app.use(express.static(path.join(__dirname, 'public')));
```

Por exemplo, quando eu quero usar um css em `public/stylesheet/menu.css`, basta adicionar no html

```html
<link rel="stylesheet" href="stylesheets/menu.css">
```

## Múltiplas funcionalidades no form

### Inserção

A primeira funcionaldiade é **Inserir** o funcionário com dados preenchidos, usando POST. Para isso, vou criar um botão específico e associar um tratador de eventos

```html
<button @click="doInserir">Inserir</button>

<script>
    // Métodos
    async function inserir() {
        // Verificar se todos os campos estão devidamente preenchidos

        // Encapsular os dados da requisição e realiza a requisição
        // POST com o axios

        // Realizar requisição de forma assíncrona
    }

    var app = new Vue({
        el: '#app',
        methods: {
            doInserir: inserir,
        }
    })
</script>
```

Com mais detalhes no que é preciso fazer em `inserir()`:

```js
// routes/funcionarios.js

async function inserir() {
    // Verificar se todos os campos estão devidamente preenchidos
    if (app.id == undefined || app.id.length == 0 ||
        app.nome == undefined || app.nome.length == 0 ||
        app.cargo == undefined || app.cargo.length == 0) {
        console.log("Campos não preenchidos de forma devida.");
        return;
    }

    // Encapsular os dados da requisição e cria a requisição
    // POST com o axios
    var data = {
        "id": app.id,
        "nome": app.nome,
        "cargo": app.cargo
    };
    var request = axios({
        "method": "post",
        "url": "/funcionarios",
        "data": data
    });

    // Realizar requisição de forma assíncrona
    try {
        response = await request
        console.log("Funcionario Inserido")
    } catch (error) {
        console.log("Erro na inserção")
    }
}
```

Para isso adicionamos os valores nos campos dos forms, com o nome da variável em `v-model` e adicionamos os dados em Vue

```html
<input type="text" id="id" v-model="id" required>
<!-- Repetir para os outros campos -->

...

<script>
    var app = new Vue({
        ...
        data: {
            id: "",
            nome: "",
            cargo: ""
        },
        ...
    })
</script>
```

Por enquanto, nenhuma funcionalidade do *POST* está definida no lado do servidor. Então ele vai retornar erro 404 ao realizar a operação **Inserir**.

Vou adicionar a ação relacionada ao *POST*, para isso vou editar o arquivo `routes/funcioanrios.js`

```js
// routes/funcionarios.js

async function inserirFuncionario(req, res) {  // POST
  // Verificar autenticação
  // not implemented...

  // Verificar se o ID usado já não está no Banco de Dados,
  // fazendo uma query com id
  var query = { "id": req.body.id };
  var response = {};
  var data = await funcionariosDB.findOne(query);
  console.log(data);

  // ID já existente
  if (data !== null) {
    response = { "resultado": "funcionario ja existente" };
    res.json(response);
    return;
  }

  // Salvar no banco de dados
  var db = new funcionariosDB(); // Conexão com o banco de dados
  db.id = req.body.id;
  db.nome = req.body.nome;
  db.cargo = req.body.cargo;
  try {
    db.save();
    response = { "resultado": "funcionario inserido" };
  } catch (err) {
    response = { "resultado": "falha de acesso ao BD" };
  }

  res.json(response);
}

router.route('/')
  .get(sendFuncionariosFile)
  .post(inserirFuncionario);
```

## Edição

Adiciono o botão e crio o método

```html
<button @click="doEditar">Editar</button>
...

<script>
async function editar() {
    // Verifica se o campo ID está preenchido
    if (app.id == undefined || app.id.length == 0) {
        app.mensagem = "preencha o ID do funcionário";
        return;
    }

    // Verifica campos do formulário
    if ((app.nome == undefined || app.nome.length == 0) &&
        (app.cargo == undefined || app.cargo.length == 0)) {
        app.mensagem = "preencha os campos que deseja editar";
        return;
    }

    // Verifica quais são os dados que serão editados e constrói
    // o objeto "novosDados"
    var novosDados = {};
    if (app.nome !== undefined || app.nome.length !== 0)
        novosDados.nome = app.nome;
    if (app.cargo !== undefined || app.cargo.length !== 0)
        novosDados.cargo = app.cargo;

    // Prepara a requisição
    var data = {
        "id": app.id,
        "novosDados": novosDados,
    };

    var request = axios({
        "method": "put",
        "url": "/funcionarios/" + app.id,
        "headers": { "Content-Type": "application/json" },
        "data": data
    });

    // Faz a requisição
    try {
        response = await request
        app.mensagem = response.data.resultado;
    } catch (error) {
        app.mensagem = "O usuário autenticado não está autorizado a fazer modificações";
    }
}
</script>
```

No backend,

```js
// routes/funcionarios.js

async function alteraFuncionario(req, res) {   // PUT
  // Verifica autenticação
  // ...

  // Prepara a query
  var response = {};
  var query = { "id": req.body.id };
  var data = req.body.novosDados;

  // Realiza a query e responde
  try {
    var dat = await funcionariosDB.findOneAndUpdate(query, data);
    if (dat == null)
      response = { "resultado": "funcionario inexistente" };
    else
      response = { "resultado": "funcionario atualizado" };
  } catch (err) {
    response = { "resultado": "falha de acesso ao DB" };
  }

  res.json(response);
}
```

## Remoção

```html
...

<script>
    async function remover() {
        if (app.id == undefined || app.id.length == 0) {
            app.mensagem = "preencha o ID do funcionário";
            return;
        }

        var data = {
            "id": app.id,
        };

        var request = axios({
            "method": "delete",
            "url": "/funcionarios/" + app.id,
            "data": data
        });
        try {
            response = await request
            app.mensagem = response.data.resultado;
            app.payload = response;
        } catch (error) {
            app.mensagem = "O usuário autenticado não está autorizado a fazer modificações";
        }
    }
</script>
```

```js
// routes/funcionarios.js

async function deletaFuncionario(req, res) {   // DELETE (remove)
  // Verifica autenticação
  // ...

  // Monta requisição
  var response = {};
  var query = { "id": req.body.id };

  // Remove
  try {
    var data = await funcionariosDB.findOneAndRemove(query);
    if (data == null)
      response = { "resultado": "funcionário inexistente" };
    else
      response = { "resultado": "funcionário removido" };
  } catch (err) {
    response = { "resultado": "falha de acesso ao DB" };
  }
  res.json(response);
}
```