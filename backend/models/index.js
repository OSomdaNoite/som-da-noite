const { sequelize } = require('../config/db')
// Importando os models
const PanelStyle = require('./panel_style')

const syncModels = async () => {
    try { 
        await sequelize.sync({ force: true});
        console.log('Models synchronized successfully')
    } catch (err) {
        console.error('Error synchronizing models: ', err)
    }
}

module.exports = {
    syncModels,
    PanelStyle,
}