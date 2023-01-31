const { Router } = require("express");
const router = Router();
const { validatePassword } = require("./controller.js");

router.get("/", (req, res) => {
  try {
    res.json(validatePassword(req.query));
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;
