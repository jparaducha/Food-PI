const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>{
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name : {
      type: DataTypes.STRING,
      allowNull: false
    },
    image : {
      type: DataTypes.STRING,
    },
    dishTypes : {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    diets : {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    healthScore : {
      type: DataTypes.INTEGER
    },
    instructions : {
      type: DataTypes.STRING
    }
  });
};
