const UserSchema = require("../db/user.schema");
const bcrypt = require("bcrypt");

class UserModel {
  static async create(form, callback) {
    try {
      let user = await UserSchema.findOne({
        username: form.username,
      });
      if (!user) {
        user = await UserSchema.findOne({
          email: form.email,
        });
      }
      if (user) {
        if (user.username === form.username) {
          return callback(false, 401, { error: "Username already exists" });
        }
        if (user.email === form.email) {
          return callback(false, 401, { error: "Email already exists" });
        }
      }

      const hashedPsw = await bcrypt.hash(form.password, 10);

      user = new UserSchema({
        username: form.username,
        email: form.email,
        password: hashedPsw,
      });

      await user.save();
      callback(true, 201, { success: "Account created" });
    } catch (err) {
      callback(false, 500, { error: "Server error, please try later" });
    }
  }
}

module.exports = UserModel;