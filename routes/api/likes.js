const express = require("express");
const router = express.Router();

const {
  likesDataController,
  likesApiController,
} = require("../../controllers/api/likes");

router.get("/", likesDataController.index, likesApiController.index);
router.delete("/:id", likesDataController.destroy, likesApiController.show);
router.put("/:id", likesDataController.update, likesApiController.show);
router.post("/", likesDataController.create, likesApiController.show);
router.get("/:id", likesDataController.show, likesApiController.show);

module.exports = router;
