/**
 * Escolha um tema para uma tabela relacional, por exemplo, "Aluno ou "Curso". A tabela de "Aluno"
 * poderia ter informações como ID, nome e idade, enquanto a tabela de "Curso" poderia ter 
 * ID, nome do curso e descrição.
 */

const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(
    // 'database_name', 'username', 'password'
        'world', 'root', 'minhaSenha', {
        host: '127.0.0.1',
        dialect: 'mysql'
    }
);

const Aluno = sequelize.define('aluno',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nascimento: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'aluno',
        timestamps: false, //para desativar as colunas createdAt e updatedAt
    }
);

module.exports = Aluno;