const router = require("express").Router();
const controller = require("./controller");

router.post("/register", async (req, res, next) => {
  try {
    const result = await controller.register(req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.post("/verify", async (req, res, next) => {
  try {
    const { email, token } = req.body;
    const result = await controller.verifyEmail(email, token);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.post("/regenerate", async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await controller.regenerate(email);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await controller.login(email, password);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.put("/generateFPToken", async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email)
    const result = await controller.generateFPToken(email);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.put("/forget-passowrd", async (req, res, next) => {
  try {
    const { email, token, password } = req.body;
    console.log(email,token,password)
    const result = await controller.forgetPassword(email, token, password);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
