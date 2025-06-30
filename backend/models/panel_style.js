const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const panel_style = sequelize.define('panel_style', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    primary_color: {
        type: DataTypes.CHAR(7),
        allowNull: false,
        validate: {
            is: /^#[0-9A-Fa-f]{6}$/i,
        },
    },
    secondary_color: {
        type: DataTypes.CHAR(7),
        allowNull: false,
        validate: {
            is: /^#[0-9A-Fa-f]{6}$/i,
        },
    },
    background_color: {
        type: DataTypes.CHAR(7),
        allowNull: false,
        validate: {
            is: /^#[0-9A-Fa-f]{6}$/i,
        },
    },
    text_color: {
        type: DataTypes.CHAR(7),
        allowNull: false,
        validate: {
            is: /^#[0-9A-Fa-f]{6}$/i,
        },
    },
    title_url: {
        type: DataTypes.STRING(255),
        unique: true,
    },
    created_at: {
        type: DataTypes.DATE,
        default: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'panel_style',
    timestamps: false,
    underscored:  true,
});

module.exports = panel_style