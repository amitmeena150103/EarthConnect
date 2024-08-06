const { Router } = require("express");
const controller = require("../controllers/initative");
const router = Router();
const multer = require("multer");
const upload = multer();

router.post(
  "/createinitaive",
  upload.single("image"),
  controller.createInitaive
);

router.get("/userinitative/:id",controller.usersInitaive)
router.delete("/deleteinitative/:id",controller.deleteInitative)
router.get("/allinitative/:id",controller.allIntiative)
router.post("/joinintiative",controller.joinIntiative)
router.post("/unjoinintiative",controller.unjoinIntiative)
router.post("/getunJoinedInitative",controller.getunJoinedInitative)
router.post("/joinedIntiative",controller.joinedIntiative)


module.exports = router;
