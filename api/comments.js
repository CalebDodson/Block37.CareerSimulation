const router = require("express").Router();
module.exports = router;
const prisma = require("../prisma");

router.get("/me", async (req, res, next) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({
                message: "Username required."
            });
        }

        const user = await prisma.user.findFirst({
            where: {username},
            include: {
                comments: true
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
})