const { Router } = require("express");
const controller = require("../controllers/post");
const router = Router();
const multer = require("multer");
const upload = multer();

router.post("/upload", upload.single("image"),controller.upload);
router.get("/getpost",controller.getPost);
router.post("/likepost",controller.likePost)
router.post("/unlikepost",controller.unLikePost)



module.exports = router;
