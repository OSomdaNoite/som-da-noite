require('dotenv').config();
const { Sequelize  } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,     
    process.env.DB_USER,    
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',  
        logging: false,  
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false 
            }
        }     
    }
);





const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database successfully');
        await sequelize.sync();
        console.log('All models were syncronized successfully')
    } catch (err) {
        console.error('Database connection error:', err.stack);
    }
}

module.exports = { sequelize, connectToDatabase };