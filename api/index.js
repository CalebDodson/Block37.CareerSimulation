const router = require("express").Router();
module.exports = router;

router.use("/comments", require("./comments"));
router.use("/items", require("./items"));
router.use("/reviews", require("./reviews"));
router.use("/users", require("./users"));
router.use("/auth", require("./auth"));