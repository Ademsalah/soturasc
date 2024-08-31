module.exports = (sequelize, DataTypes) => {
  const Panier = sequelize.define("Panier", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  Panier.associate = (models) => {
    Panier.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Panier.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };

  return Panier;
};
