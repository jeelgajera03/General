const { hash } = require("bcrypt");

function makeUserDb({ getUserModel }) {
  return Object.freeze({
    findUserByEmail,
    createUser,
  });

  async function findUserByEmail({ email }) {
    const userModel = await getUserModel();
    return await userModel.findOne({ email }).lean();
  }

  async function createUser({ name, email, password, userRole = 2 }) {
    const userModel = await getUserModel();
    const newUser = new userModel({
      name,
      email,
      password,
      userRole,
    });
    return await newUser.save();
  }
}

module.exports = makeUserDb;