module.exports = function (sequelize, DataTypes) {
    let Citations = sequelize.define("citations", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      citation:{
        type: DataTypes.TEXT("medium"),
      },
      auteur: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      acteur: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      personnage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      saison: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      episode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      favorite:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
      }
   
    });



 
  

  
    return Citations;
  };
  