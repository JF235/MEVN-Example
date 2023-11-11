function checkAuth(req, res) {
    var cookies = req.cookies;
    if (!cookies || !cookies.userAuth)
        return 'unauthorized';

    var cauth = cookies.userAuth;
    var content = JSON.parse(cauth);

    if (content.key == 'secret' && content.cargo != undefined)
        return content.cargo
    else
        return 'unauthorized';
}

module.exports = { checkAuth }