const router = require("express").Router();
const controller = require("./controller");
const secureApi = require("../../utils/secure");

router.post("/", async (req, res, next) => {
  try {
    const result = await controller.create(req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.get("/", secureApi(["admin"]), async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const result = await controller.list(limit, page);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", secureApi(["admin"]), async (req, res, next) => {
  try {
    const result = await controller.getById(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.put("/:id", secureApi(["admin"]), async (req, res, next) => {
  try {
    const result = await controller.updateById(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.delete("/:id", secureApi(["admin"]), async (req, res, next) => {
  try {
    const result = await controller.deleteById(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.patch("/status/:id", secureApi(["admin"]), async (req, res, next) => {
  try {
    const result = await controller.approve(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
