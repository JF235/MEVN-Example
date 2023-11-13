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

async function goToComprarPassagem() {
    console.log("Passagem...")
}

async function goToSolicitarEntrega() {
    console.log("Entrega...")
}

var header;
export default header = {
    template: `
<div id="headercomponent">
    <div id="ConteudoMenu">
        <h1>
            <a href="#" @click="doGoToHome">NOME DA EMPRESA</a>
        </h1>
        <img src="images/transport-enterprise-leasing-companyupdate-1653680284062.png" alt="Caminhoes">

    </div>


    <div class="menu" style="display: flex;justify-content: space-around;">
        <div class="dropdown">
            <button class="dropbtn">Servicos
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <a href="#" @click="doGoToComprarPassagem">Comprar Passagem</a>
                <a href="#" @click="doGoToSolicitarEntrega">Solicitação de Entrega</a>
            </div>
        </div>

        <div style="float: left;overflow: hidden;">
            <a class="link" @click="doLogout">Logout</a>
        </div>
    </div>

    <br>
</div>
    `,
    methods: {
        doGoToComprarPassagem: goToComprarPassagem,
        doGoToSolicitarEntrega: goToSolicitarEntrega,
        doGoToHome: goToHome,
        doLogout: logout,
    },
};