module.exports = function makeRegisterUser({ bcrypt, userDb, AlreadyExistsError, ValidationError}) {
  return async function registerUser({ name, email, password }) {
    if (!name || !email || !password) {
      throw new ValidationError('All fields (name, email, password) are required');
    }
    const existingUser = await userDb.findUserByEmail({ email });
    if (existingUser) {
      throw new AlreadyExistsError(101, 'User already exists');
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the new user
    const newUser = await userDb.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return {
      name: newUser.name,
      email: newUser.email,
      userRole: newUser.userRole,
    };
  }
}