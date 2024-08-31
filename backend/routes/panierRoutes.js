const express = require("express");
const {
  getPanierByUser,
  addToPanier,
  updatePanier,
  removeFromPanier,
} = require("../controllers/panierController");

const router = express.Router();
router.get("/panier/user/:userId", getPanierByUser);
router.post("/panier", addToPanier);
router.put("/panier/:id", updatePanier);
router.delete("/panier/:id", removeFromPanier);

module.exports = router;
