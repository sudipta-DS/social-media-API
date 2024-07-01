const express = require("express");
const {
  getAllBlog,
  addBlog,
  updateBlog,
  getBlogbyId,
  deleteBlogbyId,
  getBlogsbyUser,
} = require("../controllers/blogControllers");
const router = express.Router();

router.get("/", getAllBlog);
router.post("/add", addBlog);
router.put("/update/:id", updateBlog);
router.get("/:id", getBlogbyId);
router.delete("/delete/:id", deleteBlogbyId);
router.get("/user/:id", getBlogsbyUser);

module.exports = router;
