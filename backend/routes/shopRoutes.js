const express = require("express");
const {
  createShopController,
  getShopDetailsByIdController,
  getShopDetaislByShopNameContoller,
  updateShopController,
  deleteShopController,
  searchNearShopController,
} = require("../controllers/shopControllers");
const userAuth = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/registerShop", userAuth, createShopController);
router.get("/get-shop-details-by-Id", userAuth, getShopDetailsByIdController);
router.get(
  "/get-shop-details/:shopName",
  userAuth,
  getShopDetaislByShopNameContoller
);
router.put("/updateShop/:id", userAuth, updateShopController);
router.delete("/deleteShop/:id", userAuth, deleteShopController);
router.post("/searchShop", userAuth, searchNearShopController);

module.exports = router;
