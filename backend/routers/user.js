const { Router } = require("express");
const controllers = require("../controllers/user");

const middleware = require("../middlewares/middleware");

const router = Router();

router.route("/signup").post(middleware.signup_middleware, controllers.signup);
router.route("/signin").post(middleware.signin_middleware, controllers.signin);
router
  .route("/checktoken")
  .post(middleware.check_token, controllers.validOrnot);

router.post("/checklike", controllers.checkLikedPost);
router.post("/getuser", controllers.getuser);
router.patch("/updateabout", controllers.updateAbout);

router.post("/checkfollow",controllers.checkFollower)
router.post("/follow",controllers.setFollower)
router.post("/unfollow",controllers.unsetFollower)


module.exports = router;
