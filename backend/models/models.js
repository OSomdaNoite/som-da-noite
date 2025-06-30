
const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');


const Task = sequelize.define('Task', {
    content: {
        type:  DataTypes.STRING,
        validate:{
            max: 150,
        }
    },
    description: {
        type:  DataTypes.TEXT
    },

    is_completed:{
        type:DataTypes.BOOLEAN,
    }
})

const syncModels = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Models synchronized successfully');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
}

syncModels();

module.exports = Task