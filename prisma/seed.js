const prisma = require("../prisma");

   const seed = async () => {
    const createUsers = async () => {
        const users = [
            { username: "Odin" },
            { username: "Winston" }
         ];
         await prisma.user.createMany({ data: users });
    };
      
    const createItems = async () => {
        const items = [
            { name: "BarkBox" },
            { name: "Whimzee treats" }
        ];
        await prisma.item.createMany({ data: items });
    };

    const createReviews = async () => {
        const reviews = [
            { userId: 1, itemId: 1, body: "Best box", rating: 10 },
            { userId: 2, itemId: 2, body: "Best treat", rating: 10 },
        ];
        await prisma.review.createMany({ data: reviews });
    };

    const createComments = async () => {
        const comments = [
            { userId: 1, reviewId: 2, body: "So true, king" },
            { userId: 2, reviewId: 1, body: "I fit in box" }
        ];
        await prisma.comment.createMany({ data: comments });
    };

    await createUsers();
    await createItems();
    await createReviews();
    await createComments();

   };
   seed()
     .then(async () => await prisma.$disconnect())
     .catch(async (e) => {
       console.error(e);
       await prisma.$disconnect();
       process.exit(1);
     });