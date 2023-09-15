const Shop = require("../models/shopsModel");
const geolib = require('geolib');
const createShopController = async (req, res, next) => {
  try {
    const { shopName, owner, type, latitude, longitude } = req.body;
    if (!shopName || !owner || !type || !latitude || !longitude) {
      next("Please Enter All the Fields");
    } else {
      const newShop = new Shop({
        shopName,
        owner,
        type,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      });
  
      // Save the new shop to the database
      await newShop.save();
      res.status(201).send({
        success: true,
        message: "Shop registered successfully",
        newShop,
      });
    }
  } catch (error) {
    next(error);
  }
};
const getShopDetailsByIdController = async (req, res, next) => {
  try {
    const shops = await Shop.findOne({ userId: req.user.userId });
    console.log(shops)
    if (shops) {
      res.status(200).send({
        success: true,
        shops,
      });
    } else {
      next("Something went wrong");
    }
  } catch (error) {
    next(error);
  }
};
const getShopDetaislByShopNameContoller = async (req, res, next) => {
  try {
    const { shopName } = req.params;
    const shops = await Shop.findOne({ shopName: shopName });
    if (shops) {
      res.status(200).send({
        success: true,
        shops,
      });
    } else {
      next("Something went wrong");
    }
  } catch (error) {
    next(error);
  }
};
const updateShopController = async (req, res, next) => {
  try {
    const {id}=req.params;
    const { shopName, owner, type, latitude, longitude } = req.body;
    if (!shopName || !owner || !type || !latitude || !longitude) {
      next("Please provide name for updation");
    } else {
      const shop = await Shop.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            shopName: shopName,
            owner: owner,
            type: type,
            latitude: latitude,
            longitude: longitude,
          },
        }
      );
      res.status(200).send({
        success: true,
        message: "Details updated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
const deleteShopController = async (req, res, next) => {
    try {
        const {id}=req.params;
        const result = await Shop.findByIdAndDelete({_id:id});
        if (result) {
          res.status(200).send({
            success: true,
            message: "shop deleted successfully",
          });
        } else {
          next("Something went wrong");
        }
      } catch (error) {
        next(error);
      }
  };
const searchNearShopController=async(req,res,next)=>{
  try {
    const {latitude,longitude,maxDistance}=req.body;
    const shops = await Shop.find({
      location: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], maxDistance / 6371],
        },
      },
    });

    res.json({ shops });
  } catch (error) {
    next(error)
  }
}
module.exports = {
  createShopController,
  getShopDetailsByIdController,
  getShopDetaislByShopNameContoller,
  updateShopController,
  deleteShopController,
  searchNearShopController
};
