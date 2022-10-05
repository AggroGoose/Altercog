import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;
    const favorites = await prisma.postFavorites.findMany({
      where: {
        userId: userId,
      },
      include: {
        post: true,
      },
    });
    res.status(200).json(favorites);
  } else if (req.method === "POST") {
    const { postId, userId } = req.body;
    const favorite = await prisma.postFavorites.create({
      data: {
        post: {
          connect: {
            id: postId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.status(200).json(favorite);
  } else if (req.method === "DELETE") {
    const { postId, userId } = req.body;
    const favorite = await prisma.postFavorites.delete({
      where: {
        postId,
        userId,
      },
    });
    res.status(200).json(favorite);
  }
}
