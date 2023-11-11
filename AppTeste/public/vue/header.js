async function goToLogin() {
  console.log("Redirecting...")

  window.open("/login", "_self");
}

async function goToHome() {
  console.log("Redirecting...")

  window.open("/", "_self");
}

var header;
export default header =  {
  template: `
  <div id="headercomponent">
  <div id="ConteudoMenu">
  <h1>
  <a href="#" @click="doGoToHome">NOME DA EMPRESA</a>
  </h1>
  
  <img src="images/transport-enterprise-leasing-companyupdate-1653680284062.png" alt="Caminhoes">
  </div>
  
  <div class="menu">
      <a class="link" @click="doGoToLogin">Login</a>
  </div>

  <br>
  </div>
  `,
  methods: {
    doGoToHome: goToHome,
    doGoToLogin: goToLogin, 
  },
};