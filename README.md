# Getting Started

## Obtendo a página `index.html`

Após gerar o projeto com *express generator*, adicionar o arquivo com o router em `app.js`.

```js
var indexRouter = require('./routes/index');
```

Em `routes/index.js`, vou escrever a função que trata uma requisição do tipo *GET* na raíz. Para isso devo preparar a resposta da requisição (parâmetro `res` da função `sendIndexFile`) e enviar o arquivo com `sendFile`.

```js
var express = require('express');
var router = express.Router();

/* Método para obter página index.html, no diretório AppTeste. */
function sendIndexFile(req, res) {  // GET
  var path = 'index.html';
  res.header('Cache-Control', 'no-cache');
  res.sendFile(path, { "root": "./" });
}

router.route('/')
  .get(sendIndexFile);

module.exports = router;
```

Observe que o arquivo `AppTeste/index.html` deve existir.

## Vue e `form`

1. Não quero que o navegador tome as próprias iniciativas ao clicar em um botão de enviar no forms.

    ```html
    <form id="employeeForm">
        <div>
            <label for="id">ID:</label>
            <input type="text" id="id" name="id" required>
        </div>

        <div>
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required>
        </div>

        <div>
            <label for="cargo">Cargo:</label>
            <input type="text" id="cargo" name="cargo" required>
        </div>

        <button>Enviar</button>
    </form>
    ```

    Por exemplo, ele envia um GET com os campos

    ```
    GET /?id=123&nome=123&cargo=123 200 1.871 ms - 2324
    ```

    Para isso, vou importar o **Vue** e usar o manipulador de eventos `@submit.prevent`. Quando um formulário for submetido, evento representado por `@submit` é feito o uso do modificador `.prevent`, que previne o comportamento padrão do navegador.

    ```html
    <!-- Importando Vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
        ...

        <!-- Usando o tratador de evento com modificador -->
        <form id="employeeForm" @submit.prevent>
        ... 
    ```

    Além disso, posso escolher um método definido no objeto `Vue` para ser executado no evento `submit`.

    Primeiro defino o método...
    ```html
    <script>
        // Métodos
        async function send() {
            console.log("Sending...")
        }

        // Criando appVue
        var app = new Vue({
            el: '#app',
            data: {
            },
            methods: {
                doSend: send,
            }
        })
    </script>
    ```

    Depois associo ao evento

    ```html
    <form id="employeeForm" @submit.prevent="doSend">
        <!-- ... -->    
    </form>
    ```
    
## Redirecionando para outra página

Vou começar adicionando um tratador da nova rota "/funcionarios" no `app.js`

```js
var funcionariosRouter = require('./routes/funcionarios')
app.use('/funcionarios', funcionariosRouter);
```

Em seguida vou criar o tratador de rotas em `./routes/funcionarios.js`. Na primeira iteração, desse projeto vou somente devolver uma resposta com uma string "Funcionarios" de conteúdo.

```js
var express = require('express');
var router = express.Router();

var funcionariosDB = require('../models/funcionarios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Funcionarios');
});

module.exports = router;
```

Na parte do fronted, `index.html`, vou adicionar um link com um tratador de eventos do tipo `@click` que invoca o método `goToFuncionarios`, responsável por abrir a outra página na mesma aba.

```html
<!-- Preciso incluir axios -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.15.2/axios.js"></script>

<body>
    <div id="app">
        ...

        <div id="menu">
            <a class="link" @click="doGoToFunc">Funcionários</a>
        </div>
    </div>

    <script>
        // Métodos
        async function goToFuncionarios() {
            console.log("Redirecting...");
            // Abre em uma outra aba
            window.open("/funcionarios", "_self");
        }

        // Criando appVue
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
        "curso": app.cargo
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
    // Verifica campos do formulário
    if ((app.nome == undefined || app.nome.length == 0) &&
        (app.cargo == undefined || app.cargo.length == 0)) {
        app.mensagem = "Preencha os campos Nome/Cargo";
        return;
    }
    
    // Atualiza as novas infromações
    var data = {
        "id": app.id,
    };
    
    if (app.nome == undefined || app.nome.length == 0)
        data.nome = app.nome;
    if (app.cargo == undefined || app.cargo.length == 0)
        data.cargo = app.cargo;

    // Prepara a requisição
    var request = axios({
        "method": "put",
        "url": "/funcionarios/" + app.id,
        "headers": { "Content-Type": "application/json" },
        "data": data
    });

    // Faz a requisição
    try {
        response = await request
        console.log(response.data.resultado);
    } catch (error) {
        console.log("O usuário autenticado não está autorizado a fazer modificações");
    }
}


...
var app = new Vue({
            methods: {
                ...
                doEditar: editar,
                ...
            }
        })
</script>
```

## Remoção