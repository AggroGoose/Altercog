import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const postId = `${req.query.postId}`;
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: true,
        likedBy: true,
        replies: {
          include: {
            user: true,
            likedBy: true,
          },
        },
      },
    });
    res.status(200).json(comments);
  } else if (req.method === "POST") {
    if (req.body.type === "comment") {
      const { postId, userId, content } = req.body;
      const comment = await prisma.comment.create({
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
          content,
        },
      });
      res.status(200).json(comment);
    } else if (req.body.type === "reply") {
      const commentId = `${req.body.commentId}`;
      const userId = `${req.body.userId}`;
      const content = `${req.body.content}`;
      const reply = await prisma.reply.create({
        data: {
          comment: {
            connect: {
              id: commentId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          content,
        },
      });
      res.status(200).json(reply);
    }
  } else if (req.method === "DELETE") {
    const { type, id } = req.body;
    if (type === "comment") {
      const commentReplies = await prisma.reply.findMany({
        where: {
          commentId: id,
        },
      });
      for (const reply of commentReplies) {
        await prisma.replyLikes.deleteMany({
          where: {
            replyId: reply.id,
          },
        });
        await prisma.reply.delete({
          where: {
            id: reply.id,
          },
        });
      }
      const commentLikes = await prisma.commentLikes.deleteMany({
        where: {
          commentId: id,
        },
      });
      const comment = await prisma.comment.delete({
        where: {
          id,
        },
      });
      res.status(200).json(comment);
    } else if (type === "reply") {
      const replyLikes = await prisma.replyLikes.deleteMany({
        where: {
          replyId: id,
        },
      });
      const reply = await prisma.reply.delete({
        where: {
          id,
        },
      });
      res.status(200).json(reply);
    }
  } else if (req.method === "PUT") {
    const { type, id, content } = req.body;
    if (type === "comment") {
      const comment = await prisma.comment.update({
        where: {
          id,
        },
        data: {
          content,
        },
      });
      res.status(200).json(comment);
    } else if (type === "reply") {
      const reply = await prisma.reply.update({
        where: {
          id,
        },
        data: {
          content,
        },
      });
      res.status(200).json(reply);
    }
  }
}
