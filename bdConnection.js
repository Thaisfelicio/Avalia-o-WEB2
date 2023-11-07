//documento onde será criada o banco de dados mysql

const mySql = require('mysql2');

//criando conexão no banco de dados aluno no mysql
const databaseConnection = mySql.createConnection({
    host: "localhost",
    user: "root",
    password: 'minhaSenha',
    database: "world"
});

//conectando ao banco de dados
databaseConnection.connect((error)=>{
    if(error)
    {
        console.log("Conexão com banco de dados falhou!", error);
    }
    else
    {
        console.log('Conexão com o banco de dados realizada com sucesso!');
    }
});

module.exports = databaseConnection;