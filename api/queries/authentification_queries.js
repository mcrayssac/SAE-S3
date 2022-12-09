const getUser = "SELECT * FROM PUBLIC AS P WHERE P.email_public LIKE $1;";

module.exports = {
    getUser
}