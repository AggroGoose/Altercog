import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { userId } = req.query;
    if (!userId) {
      res.status(400).json({ error: "Missing userId" });
      return;
    }
    const userString = userId.toString();
    const favorites = await prisma.postFavorites.findMany({
      where: {
        userId: userString,
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
    const { postId, userId }: { postId: string; userId: string } = req.body;
    const favorite = await prisma.postFavorites.delete({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
    res.status(200).json(favorite);
  }
}
