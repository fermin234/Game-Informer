require("dotenv").config();

function validatePassword({ password }) {
  try {
    console.log(password);
    return password === process.env.PASSWORD_DELETE;
  } catch (error) {
    return error;
  }
}
module.exports = {
  validatePassword,
};
