const { Panier, Product } = require("../database");

const getPanierByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const panierItems = await Panier.findAll({
      where: { userId },
      include: [{ model: Product, as: "product" }], 
    });

    if (panierItems.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found in the cart for this user" });
    }

    res.status(200).json(panierItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const addToPanier = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const panier = await Panier.create({ userId, productId, quantity });
    res.status(201).json(panier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updatePanier = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const panier = await Panier.findByPk(id);

    if (!panier) {
      return res.status(404).json({ error: "Panier item not found" });
    }

    panier.quantity = quantity;
    await panier.save();

    res.status(200).json(panier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const removeFromPanier = async (req, res) => {
  try {
    const { id } = req.params;

    const panier = await Panier.findByPk(id);

    if (!panier) {
      return res.status(404).json({ error: "Panier item not found" });
    }

    await panier.destroy();
    res.status(200).json({ message: "Product removed from panier" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getPanierByUser,
  addToPanier,
  updatePanier,
  removeFromPanier,
};
