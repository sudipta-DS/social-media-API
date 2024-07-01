const blogModel = require("../models/blog");
const userModel = require("../models/user");

const getAllBlog = async (req, res) => {
  try {
    const allBlogs = await blogModel.find();
    if (!allBlogs) {
      res.status(400).json({ message: "No blogs found." });
    } else {
      res.status(200).json({ allBlogs });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something problem happened" });
  }
};

const addBlog = async (req, res) => {
  const { title, description, image, user } = req.body;
  try {
    const existingUser = await userModel.findById(user);
    console.log(existingUser);
    if (existingUser) {
      try {
        const newBlog = await blogModel.create({
          title: title,
          description: description,
          image: image,
          user: user,
        });
        const updatedBlogs = [...existingUser.blogs, newBlog._id];
        const updatedUser = await userModel.findByIdAndUpdate(user, {
          blogs: updatedBlogs,
        });
        res
          .status(201)
          .json({ message: "blog created successfully.", newBlog });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something problem happened." });
      }
    } else {
      res.status(400).json({ message: "user not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something problem happened." });
  }
};

const updateBlog = async (req, res) => {
  const newUpdate = req.body;
  const postId = req.params.id;
  try {
    const updatedBlog = await blogModel.findByIdAndUpdate(postId, req.body);
    res
      .status(201)
      .json({ message: "blog updated successfully.", updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "something problem happened." });
  }
};

const getBlogbyId = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await blogModel.findById(blogId);
    if (blog) {
      res.status(201).json({ message: "blog found", blog });
    } else {
      res.status(400).json({ message: "blog not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "something problem happened." });
  }
};

const deleteBlogbyId = async (req, res) => {
  const blogId = req.params.id;
  const deletedBlog = await blogModel.findByIdAndDelete(blogId);
  if (deletedBlog) {
    res
      .status(200)
      .json({ message: "blog deleted successfully.", deletedBlog });
  } else {
    res.status(400).json({ message: "blog not found." });
  }
};

const getBlogsbyUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const { blogs: blogsByUser } = await userModel
      .findById(userId)
      .populate("blogs");
    if (blogsByUser) {
      res.status(200).json({ blogsByUser });
    } else {
      res.status(400).json({ message: "user is not defined." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something problem happened" });
  }
};

module.exports = {
  getAllBlog,
  addBlog,
  updateBlog,
  getBlogbyId,
  deleteBlogbyId,
  getBlogsbyUser,
};
