import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { type, id } = req.query;
    if (type === "post") {
      const postLikes = await prisma.postLike.findMany({
        where: {
          postId: id,
        },
        include: {
          user: true,
        },
      });
      res.status(200).json(postLikes);
    } else if (type === "comment") {
      const commentLikes = await prisma.commentLike.findMany({
        where: {
          commentId: id,
        },
        include: {
          user: true,
        },
      });
      res.status(200).json(commentLikes);
    } else if (type === "reply") {
      const replyLikes = await prisma.replyLike.findMany({
        where: {
          replyId: id,
        },
        include: {
          user: true,
        },
      });
      res.status(200).json(replyLikes);
    }
  } else if (req.method === "POST") {
    const { postId, userId, type } = req.body;
    if (type === "post") {
      const postLike = await prisma.postLike.create({
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
      const commentLike = await prisma.commentLike.create({
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
      const replyLike = await prisma.replyLike.create({
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
      const postLike = await prisma.postLike.deleteMany({
        where: {
          postId,
          userId,
        },
      });
      res.status(200).json(postLike);
    } else if (type === "comment") {
      const commentLike = await prisma.commentLike.deleteMany({
        where: {
          commentId: postId,
          userId,
        },
      });
      res.status(200).json(commentLike);
    } else if (type === "reply") {
      const replyLike = await prisma.replyLike.deleteMany({
        where: {
          replyId: postId,
          userId,
        },
      });
      res.status(200).json(replyLike);
    }
  }
}
