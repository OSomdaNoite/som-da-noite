const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Archive = sequelize.define('Archive', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  artist: {
    type: DataTypes.STRING,
    allowNull: true
  },

  album: {
    type: DataTypes.STRING,
    allowNull: true
  },

  path: {
    type: DataTypes.STRING,
    allowNull: false
  },

  coverUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },

  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Duração da música em segundos'
  },

  size: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Tamanho do arquivo em bytes'
  },

  mimeType: {
    type: DataTypes.STRING,
    allowNull: true
  },

  bitrate: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Bitrate do áudio (ex: 320)'
  },

  plays: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Quantidade de vezes que tocou na rádio'
  },

  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'archives',
  timestamps: true
});

module.exports = Archive;
