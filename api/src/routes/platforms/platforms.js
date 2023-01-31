const { Router } = require("express");
const router = Router();
const { getPlataforms } = require("./controller.js");

router.get("/", async (req, res) => {
  try {
    res.json(await getPlataforms());
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
