const router = require("express").Router();
module.exports = router;
const prisma = require("../prisma");

router.post("/register", async (req, res, next) => {
    try {
        const { username } = req.body;  
        const newUser = await prisma.user.create({
            data: {
                username
            }
        })
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({
                message: "Username required."
            });
        }

        const user = await prisma.user.findFirst({
            where: { username: username }
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
});

router.get("/me", async (req, res, next) => {
    try {
        const { username } = req.body;

        const user = await prisma.user.findFirst({
            where: {username},
            include: {
                reviews: true,
                comments: true,
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
});