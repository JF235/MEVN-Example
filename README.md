# Getting Started

## Obtendo a página index.html

Em `app.js`

```js
var indexRouter = require('./routes/index');
```

Em `routes/index.js`

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

    Para isso, vou importar o **Vue** e usar o manipulador de eventos `@submit.prevent`: quando um formulário for submetido, evento "@submit" é feito o uso do modificador ".prevent", que previne o comportamento padrão do navegador.

    ```html
    <!-- Vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>

    <div id="app">

         <form id="employeeForm" @submit.prevent>
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

    </div>
    ```

    Além disso, posso escolher um método definido no App Vue para ser executado no evento `submit`.

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

Em seguidam vou criar o tratador de rotas em `./routes/funcionarios.js`. Na primeira iteração, desse projeto vou somente devolver uma resposta com uma string "Funcionarios" de conteúdo.

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

Na parte do fronted, `index.html`, vou adicionar um link com um tratador de eventos do tipo "@click" que invoca o método `goToFuncionarios`, responsável por abrir a outra página na mesma aba.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.15.2/axios.js"></script>
<!-- Preciso incluir axios -->
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

Agora se eu quero que a nova janela seja o formulário de  `funcionarios.html`, vou editar o conteúdo da resposta no `funcionarios.js`

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

O projeto express permite retornar diretamente arquivos estáticos presentes no diretório "public/". Isso foi configurado em `app.js`

```js
// Obtém os arquivos estáticos em public/ por padrão
app.use(express.static(path.join(__dirname, 'public')));
```

Por exemplo, quando eu quero usar um css em `public/stylesheet/menu.css`, basta adicionar no html

```html
<link rel="stylesheet" href="stylesheets/menu.css">
```

## Múltiplas funcionalidades no form

