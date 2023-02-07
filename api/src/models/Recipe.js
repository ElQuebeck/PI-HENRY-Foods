const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diets: {
      type: DataTypes.STRING
    },
    summary:{
      type: DataTypes.TEXT
    },
    healthscore:{
      type: DataTypes.INTEGER
    },
    steps:{
      type:DataTypes.STRING
      },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue:true
  } 
    
  }, {timestamps:false});
};
