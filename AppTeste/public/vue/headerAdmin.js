async function goToFuncionarios() {
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
    window.open("/", "_self");
}

async function goToViagens() {
    window.open("/viagens", "_self");
}

var header;
export default header = {
    template: `
    <div id="headercomponent">
    
    <div id="ConteudoMenu">
    <h1>
    <a href="#" @click="doGoToHome">FEEC Transportes</a>
    </h1>
    <img src="/images/transport-enterprise-leasing-companyupdate-1653680284062.png" alt="Caminhoes">
    
    </div>
    
  
    <div class="menu" style="display: flex;justify-content: space-around;">
        <a class="link" @click="doGoToFunc">Gerenciar Usuários</a>

        <a class="link" @click="doGoToViagens">Gerenciar Viagens</a>

        <a class="link" @click="doLogout">Logout</a>
    </div>
  
    <br>
    </div>
    `,
    methods: {
        doGoToHome: goToHome,
        doGoToFunc: goToFuncionarios,
        doGoToViagens: goToViagens,
        doLogout: logout,
    },
};