const Sequelize = require('sequelize');
const database = require('../db_connect');

const Contactus = database.define('contactus', {

        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        
        email:{
            type: Sequelize.STRING,
            allowNull: false
        },

        phone:{
            type: Sequelize.STRING,
        },

        message:{
            type: Sequelize.STRING,
        },

        is_deleted:{
          type: Sequelize.BOOLEAN,
        },

        createdAt: {
            type: Sequelize.DATE,
            field: 'created_at'
        },
    
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at'
        }
    }, {
    // options
    freezeTableName: true
});

// Admin.sync({ force: true })

module.exports= Contactus;