import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { type, id } = req.query;
    if (!type || !id) {
      res.status(400).json({ error: "Missing type or id" });
      return;
    }
    if (type === "post") {
      const postLikes = await prisma.postLikes.findMany({
        where: {
          postId: id.toString(),
        },
        include: {
          user: true,
        },
      });
      res.status(200).json(postLikes);
    } else if (type === "comment") {
      const commentLikes = await prisma.commentLikes.findMany({
        where: {
          commentId: id.toString(),
        },
        include: {
          user: true,
        },
      });
      res.status(200).json(commentLikes);
    } else if (type === "reply") {
      const replyLikes = await prisma.replyLikes.findMany({
        where: {
          replyId: id.toString(),
        },
        include: {
          user: true,
        },
      });
      res.status(200).json(replyLikes);
    }
  } else if (req.method === "POST") {
    const { postId, userId, type } = req.body;
    if (!postId || !userId || !type) {
      res.status(400).json({ error: "Missing postId, userId, or type" });
      return;
    }
    if (type === "post") {
      const postLike = await prisma.postLikes.create({
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
      res.status(200).json(postLike);
    } else if (type === "comment") {
      const commentLike = await prisma.commentLikes.create({
        data: {
          comment: {
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
      res.status(200).json(commentLike);
    } else if (type === "reply") {
      const replyLike = await prisma.replyLikes.create({
        data: {
          reply: {
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
      res.status(200).json(replyLike);
    }
  } else if (req.method === "DELETE") {
    const { postId, userId, type } = req.body;
    if (type === "post") {
      const postLike = await prisma.postLikes.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });
      res.status(200).json(postLike);
    } else if (type === "comment") {
      const commentLike = await prisma.commentLikes.delete({
        where: {
          commentId_userId: {
            commentId: postId,
            userId,
          },
        },
      });
      res.status(200).json(commentLike);
    } else if (type === "reply") {
      const replyLike = await prisma.replyLikes.delete({
        where: {
          replyId_userId: {
            replyId: postId,
            userId,
          },
        },
      });
      res.status(200).json(replyLike);
    }
  }
}
