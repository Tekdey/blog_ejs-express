const PostSchema = require("../db/post.schema");

/**
 * Post data-mapper
 */
class PostModel {
  /**
   * Create a post in database
   * @param {object} post content, image, author
   * @param {function} callback
   * @returns callback (isValid, status, message: 'success' or 'error')
   */
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
  /**
   * Get all posts from database
   * @returns posts
   */
  static async getAllPost() {
    try {
      const posts = await PostSchema.find();

      return posts;
    } catch (error) {
      return error.message;
    }
  }
  /**
   * Check if posts are valids and return callback to the controller
   * @param {object} post content
   * @param {function} callback callback (isValid, status, message: 'success' or 'error')
   * @returns callback
   */
  static _check(post, callback) {
    if (post.content.length > 150) {
      return callback(false, 406, {
        error: "Message can not be greater than 150",
      });
    }
    if (post.content.trim() === "") {
      return callback(false, 406, { error: "Message can not be empty" });
    }
    return callback(true);
  }
}

module.exports = PostModel;
