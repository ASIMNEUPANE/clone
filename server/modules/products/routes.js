const multer = require("multer");
const router = require("express").Router();
const controller = require("./controller");
const secureAPI = require("../../utils/secure");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/Public/products");
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
        req.bocy.images = [];
        req.files.map((file) =>
          req.body.images.push("products/".concat(file.filename))
        );
      }
      if(req.body.images && req.body.images.length >0 ){
        req.files = req.body.images;
        req.body.images=[]
        req.files.map((file)=> req.body.images.push(file))
      }
      req.body.created_by = req.currentUser;
      
      const result = await controller.create(req.body);
      res.json({ data: result, msg: "success" });
    } catch (e) {}
  }
);

module.exports = router;
