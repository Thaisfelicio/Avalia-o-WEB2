/** Objetivo: criar uma API CRUD RESTful que gerencie uma tabela relacional simples
 */

//porta que a api irá usar
const port = 3000;
const express = require('express');
const app = express();
const modeloAluno = require('./model/aluno');

//configurações para identificar o json
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const database = require('./bdConnection');
const nameTable = 'aluno';

//função para criar a tabela
function criarTabelaAluno(nomeTabela, database, callback) {
    //query para criar tabela
    //caso seja a primeira vez que esta tabela será manipulada ele cria uma tabela nova com as colunas id, nome e nascimento
    const queryCreateTable = `CREATE TABLE IF NOT EXISTS ${nomeTabela}(
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        nascimento VARCHAR(11) NOT NULL,
        PRIMARY KEY(id)
    )`;

    //quando o usuário faz uma requisição a tabela aluno é criada se ela não existir
    database.query(queryCreateTable, (err, rows) => {
        if(err) 
        {
            console.log("Criação de tabela falhou: ", err);
            callback(err);
        }
        else
        {
            console.log(`Tabela ${nomeTabela} criada com sucesso! ${rows}`);
            callback(null);
        }
        
    });
}

function criarAluno(nomeTabela, database, nome, nascimento, callback) {
    const queryAddAluno = `INSERT INTO ${nomeTabela}(nome, nascimento) VALUES (?, ?)`;

    //query para inserir o aluno novo na tabela
    database.query(queryAddAluno, [nome, nascimento], (err, res) =>{
        if(err) {
            console.log("Erro ao inserir aluno:", err);
            callback(err);
        }
        else
        {
            console.log(`Aluno ${nome} inserido com sucesso!`)
            callback(null);
        }
    });
}

app.post('/alunos', async (req, res) =>{
    const {nome, nascimento} = req.body;
    
    criarTabelaAluno(nameTable, database, (err) => {
        if(err) {
            return res.send("Erro ao criar tabela!");
        }
    });

    criarAluno(nameTable, database, nome, nascimento, (err, rows) =>{
        if (err) {
            return res.send("Erro ao inserir aluno!");
        }
        return res.send(`Aluno ${nome} inserido com sucesso! ${rows}`);
    })
});

//mostra todos os alunos
app.get('/alunos', async (req, res) => {
    try 
    {   //consulta todos os alunos na tabela aluno
        const consultaAlunos = await modeloAluno.findAll();
        return res.status(200).json(consultaAlunos);
    } 
    catch(err)
    {
        return res.status(500).send("Erro ao consultar tabela!");
    }
    
});

//mostra um aluno específico
app.get('/alunos/:id', async (req, res) => {
    const {id} = req.params;

    try 
    {   //consulta o aluno por id no banco de dados
        const aluno = await modeloAluno.findOne({where: {id: id}});

        if(aluno)
        {
            res.status(200).json(aluno);
        }
        else
        {
            res.status(404).send("Aluno não encontrado!");
        }
    }
    catch(err)
    {
        console.log('Erro ao consultar aluno', err);
        res.status(500).send("Erro ao consultar aluno!");
    }
});

//atualiza os dados de um aluno existente
app.put('/alunos/:id', async (req, res) => {
    const {id} = req.params;
    const {nome, nascimento} = req.body;
    
    try
    {
        //encontra o aluno pelo id
        const aluno = await modeloAluno.findByPk(id);

        if(!aluno)
        {   //retorna o status 404 de não encontrado
            return res.status(404).send('Aluno não encontrado');
        }

        //atualiza os campos de nome e nascimento do aluno
        aluno.nome = nome;
        aluno.nascimento = nascimento;

        //salva as alterações feitas no aluno no banco de dados
        await aluno.save();

        return res.status(200).send('Aluno atualizado com sucesso');
    }
    catch(err)
    {
        console.log("Erro ao atualizar aluno: ", err);
        return res.status(500).send("Erro ao atualizar aluno");
    }
});

//deleta um aluno existente
app.delete('/alunos/:id', async (req, res) => {
    const {id} = req.params;

    //query para deletar um aluno apartir de seu id
    database.query(`DELETE FROM aluno WHERE id = ${parseInt(id)}`, (err, result) => {
        if(err) return res.send("Erro ao deletar aluno! \n Erro: ", err);
        return res.send(`Aluno ${id} deletado com sucesso!`);
    });
});

//comando para que a api rode na porta da variavel port
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});