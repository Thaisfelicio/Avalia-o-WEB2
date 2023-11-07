# Como executar a API RESTFUL

## Pré- requisitos

- Node.js instalado
- Pacotes npm: express, sequelize, mysql2
- Postman instalado (opcional)

## Como executar

1. No terminal, execute o comando: `node app.js` para iniciar a API

2. Use o postman ou qualquer outra plataforma de API's:
    - No postman clique no mais (+) para criar um novo request, ele criará primeiro uma solicitação GET, para buscar um aluno específico digite `http://localhost:3000/alunos/idDoAluno` ao lado do GET, onde `idDoAluno` é o ID do aluno, por exemplo: `http://localhost:3000/alunos/1`.

    - Para adicionar um novo aluno: Crie uma solicitação POST com a URL `http://localhost:3000/alunos`, e abaixo selecione body, depois raw, ao lado aparecerá Text, clique nele e altere para JSON, logo abaixo digite:
        ```
        {
            "nome": "",
            "nascimento": ""
        }
        ```

        para adicionar um novo aluno, dentro das aspas digite o nome do aluno no campo "nome", e digite a data de nascimento no campo "nascimento", e clique no botão azul escrito "send".

    - Para atualizar um aluno: Crie uma solicitação PUT com a URL `http://localhost:3000/alunos/idDoAluno` e o corpo JSON com os dados atualizados.
    - Para listar todos os alunos: Crie uma solicitação GET com a URL `http://localhost:3000/alunos`.
    - Para deletar um aluno: Crie uma solicitação DELETE com a URL `http://localhost:3000/alunos/idDoAluno`.


