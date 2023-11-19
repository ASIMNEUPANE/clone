const router = require("express").Router();
const controller = require("./controller");
const secureAPI = require('../../utils/secure')

router.post("/", secureAPI(['admin']), async (req, res, next) => {
  try {
    req.body.created_by = req.currentUser;
    const result = await controller.create(req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
