const router = require("express").Router();
module.exports = router;
const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
    try {
        const items = await prisma.item.findMany();
        res.json(items);

    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id;
        const item = await prisma.item.findUnique({ where: { id } });

        if (!item) {
            return next({
                status: 404,
                message: `Could not find item with id ${id}.`
            });
        }

        res.json(item);

        
    } catch (error) {
        next(error);
    }
});

router.get("/:id/reviews", async (req, res, next) => {
    try {
        const id = +req.params.id;
        const reviews = await prisma.review.findMany({ where: { itemId: id }});
        res.json(reviews);

    } catch (error) {
        next(error);
    }
});

router.get("/:itemId/reviews/:id", async (req, res, next) => {    
    try {
        const itemId = +req.params.itemId;
        const id = +req.params.id;
        const review = await prisma.review.findFirst({ where: { itemId: itemId, id: id } });

        if (!review) {
            return next({
                status: 404,
                message: `Review with ID ${id} for item ${itemId} not found.`
            });
        }

        res.json(review);

    } catch (error) {
        next(error);
    }
});

router.post("/:id/reviews", async (req, res, next) => {
    try {
        const itemId = +req.params.id;
        const { body, userId, rating } = req.body;

        if (!body || !userId || !rating) {
            return next({
                status: 400,
                message: "Review body, userId, and rating are required."
            });
        }

        const item = await prisma.item.findUnique({ where: { id: itemId } });
        if (!item) {
            return next({
                status: 404,
                message: `Item with ID ${itemId} not found.`
            });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return next({
                status: 404,
                message: `User with ID ${userId} not found.`
            });
        }

        const newReview = await prisma.review.create({
            data: {
                body,
                rating,
                itemId,
                userId
            }
        });

        res.status(201).json(newReview);

    } catch (error) {
        next(error);
    }
});

router.post("/:itemId/reviews/:id/comments", async (req, res, next) => {
    try {
        const itemId = +req.params.itemId;
        const id = +req.params.id;
        const { body, userId, reviewId } = req.body;

        if (!body || !userId || !reviewId) {
            return next({
                status: 400,
                message: "Review body, userId, and reviewId are required."
            });
        }

        const item = await prisma.item.findUnique({ where: { id: itemId } });
        if (!item) {
            return next({
                status: 404,
                message: `Item with ID ${itemId} not found.`
            });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return next({
                status: 404,
                message: `User with ID ${userId} not found.`
            });
        }

        const review = await prisma.review.findUnique({ where: { id: reviewId } });
        if (!review) {
            return next({
                status: 404,
                message: `Review with ID ${reviewId} not found.`
            });
        }

        const newComment = await prisma.comment.create({
            data: {
                body,
                userId,
                reviewId
            }
            
        })

        res.status(201).json(newComment);

    } catch (error) {
        next(error);
    }
});