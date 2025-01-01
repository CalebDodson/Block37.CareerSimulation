const router = require("express").Router();
module.exports = router;
const prisma = require("../prisma");

router.put("/:userId/comments/:id", async (req, res, next) => {
    try {
        const userId = +req.params.userId;
        const id = +req.params.id;

        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            return next({
                status: 404,
                message: `Could not find user with userId ${userId}`,
            });
        }

        const commentExists = await prisma.comment.findUnique({ where: { id } });
        if (!commentExists) {
            return next({
                status: 404,
                message: `Could not find comment with id ${id}`,
            });
        }

        const { body } = req.body;

        if (!body) {
            return next({
                status: 400,
                message: `Comment body must provided.`
            })
        }

        const updatedComment = await prisma.comment.update({
            where: { id },
            data: { body }
        });

        res.json(updatedComment);

    } catch (error) {
        next(error);
    }
})

router.delete("/:userId/comments/:id", async (req, res, next) => {
    try {
        const userId = +req.params.userId;
        const id = +req.params.id;

        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            return next({
                status: 404,
                message: `Could not find user with userId ${userId}`,
            });
        }

        const commentExists = await prisma.comment.findUnique({ where: { id } });
        if (!commentExists) {
            return next({
                status: 404,
                message: `Could not find comment with id ${id}`,
            });
        }

        await prisma.comment.delete({ where: { id } });
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
})

router.delete("/:userId/reviews/:id", async (req, res, next) => {
    try {
        const userId = +req.params.userId;
        const id = +req.params.id;

        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            return next({
                status: 404,
                message: `Could not find user with userId ${userId}`,
            });
        }

        const reviewExists = await prisma.review.findUnique({ where: { id } });
        if (!reviewExists) {
            return next({
                status: 404,
                message: `Could not find review with id ${id}`,
            });
        }

        await prisma.review.delete({ where: { id } });
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
})