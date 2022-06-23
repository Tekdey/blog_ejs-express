const PostSchema = require("../db/post.schema");

class PostModel {
  static async create({ content, image, author }, callback) {
    try {
      const postCreated = await PostSchema.create({
        content,
        image,
        author,
      });
      if (!postCreated) {
        return callback(false, 409, {
          error: "Server error, please try later",
        });
      }
      callback(true, 500, { success: "Post created" });
    } catch (error) {
      callback(false, 500, { error: "Server error, please try later" });
    }
  }
  static async getAllPost() {
    try {
      const posts = await PostSchema.find();

      return posts;
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = PostModel;
