const { DataTypes, literal } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>{
  // defino el modelo
  sequelize.define('recipe', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image : {
      type: DataTypes.STRING,
    },
    dishTypes : {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore : {
      type: DataTypes.INTEGER
    },
    instructions : {
      type: DataTypes.TEXT
    },
    score : {
      type: DataTypes.INTEGER
    }
  }, {timestamps: false});
};
