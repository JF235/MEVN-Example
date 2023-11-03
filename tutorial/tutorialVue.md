# Vue

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