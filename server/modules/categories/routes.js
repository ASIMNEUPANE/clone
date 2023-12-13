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
router.get("/", secureAPI(['admin']), async (req, res, next) => {
  try {
    // req.body.created_by = req.currentUser;
    const {limit ,page,isArchived,name}= req.query
   const search = {isArchived,name}
    const result = await controller.list(page,limit,search);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.get("/:id", secureAPI(['admin']), async (req, res, next) => {
  try {
    const result = await controller.getById(req.params);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.put("/:id", secureAPI(['admin']), async (req, res, next) => {
  try {
    const result = await controller.updateById(req.params.id,req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
