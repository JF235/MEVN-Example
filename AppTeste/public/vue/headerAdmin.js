async function goToFuncionarios() {
    console.log("Redirecting...")

    window.open("/funcionarios", "_self");
}

async function logout() {
    var request = axios({
        "method": "delete",
        "url": "/login"
    });
    
    try {
        var response = request
        window.open("/index.html", "_self");
    }
    catch (error) {
        app.mensagem = "Usuário não autenticado - Faça login primeiro"
    }
}

async function goToHome() {
    console.log("Redirecting...")

    window.open("/", "_self");
}

var header;
export default header = {
    template: `
    <div id="headercomponent">
    <h1>
    <a href="#" @click="doGoToHome">NOME DA EMPRESA</a>
    </h1>
    
  
    <div class="menu" style="display: flex;justify-content: space-around;">
        <a class="link" @click="doGoToFunc">Gerenciar Funcionarios</a>

        <a class="link" @click="doLogout">Logout</a>
    </div>
  
    <br>
    </div>
    `,
    methods: {
        doGoToHome: goToHome,
        doGoToFunc: goToFuncionarios,
        doLogout: logout,
    },
};