const { Router } = require("express");

const router = Router();

const user = require("./user")
const post = require("./post")
const initative = require("./initative")

router.use("/api/v1/user",user)
router.use("/api/v1/post",post)
router.use("/api/v1/initative",initative)

module.exports = router