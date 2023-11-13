const router = require("express").Router();
const controller = require("./auth.controller");

router.post("/register", async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await controller.register(req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
