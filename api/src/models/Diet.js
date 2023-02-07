const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Diet', {
    // id:{
    //   type: DataTypes.INTEGER,      
    //   primaryKey: true,
    //   autoincrement: true
    // },
    name: {
      type: DataTypes.STRING,      
    }      
  }, {timestamps:false});
};
