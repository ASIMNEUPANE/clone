const router = require("express").Router();
const controller = require("./controller");

router.post("/", async (req, res, next) => {
  try {
    req.body.created_by = req.currentUser;
    req.body.updated_by = req.currentUser;
    req.body.created_at = new Date();
    const result = await controller.create(req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { page, limit } = req.body;
    const result = await controller.list(page, limit);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.get("/profile", async (req, res, next) => {
  try {
    result = await controller.getById(req.currentUser);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { id, ...rest } = req.body;
    const result = await controller.updateById(id, rest);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.put("/change-password", async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const result = await controller.changePassword(
      req.currentUser,
      oldPassword,
      newPassword
    );
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.put("/reset-password", async (req, res, next) => {
  try {
    const { id, ...rest } = req.body;
    const result = await controller.resetPassword(id, rest);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.get("/block/:id", async (req, res, next) => {
  try {
    const result = await controller.block(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const result = await controller.archived(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const result = await controller.getById(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
