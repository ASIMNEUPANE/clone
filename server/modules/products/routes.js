const multer = require("multer");
const router = require("express").Router();
const controller = require("./controller");
const secureAPI = require("../../utils/secure");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/products");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "." + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  secureAPI(["admin"]),
  upload.array("images", 4),
  async (req, res, next) => {
    try {
      if (req.files) {
        req.body.images = [];
        req.files.map((file) =>
          req.body.images.push("products/".concat(file.filename))
        );
      }
      if (req.body.images && req.body.images.length > 0) {
        req.files = req.body.images;
        req.body.images = [];
        req.files.map((file) => req.body.images.push(file));
      }
      req.body.created_by = req.currentUser;

      const result = await controller.create(req.body);
      res.json({ data: result, msg: "success" });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const { page, limit, isArchived, name } = req.query;
    const search = { isArchived, name };
    const result = await controller.list({ page, limit, search });
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
router.put(
  "/:id",
  secureAPI(["admin"]),
  upload.array("images", 4),
  async (req, res, next) => {
    try {
      if (req.files) {
        req.body.images = [];
        req.files.map((file) => {
          req.body.images.push("products/".concat(file.filename));
        });
      }
      req.body.updated_by = req.currentUser;
      console.log(req.body)
      const result = await controller.updateById(req.params.id, req.body);
      res.json({ data: result, msg: "success" });
    } catch (e) {
      next(e);
    }
  }
);
router.delete("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.body.updated_by = req.currentUser;
    const result = controller.deleteById(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
