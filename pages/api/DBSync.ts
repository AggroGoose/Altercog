import { Tags } from "@tryghost/content-api";
import { NextApiRequest, NextApiResponse } from "next";
import { getAllPostsForHome, getAllTags } from "../../lib/ghost";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await prisma.post.deleteMany();

  let tags: void | Tags = await getAllTags().catch((error) => {
    console.error(error);
  });
  if (tags) {
    for (const tag of tags) {
      const { id, name, slug } = tag;
      const tagExists = await prisma.tags.findUnique({
        where: {
          id,
        },
      });
      if (!tagExists && name) {
        await prisma.tags.create({
          data: {
            id,
            name,
            slug,
          },
        });
      }
    }
  }

  const updatedTags = await prisma.tags.findMany();

  let posts;
  try {
    posts = await getAllPostsForHome();
  } catch (error) {
    console.error(error);
  }

  if (posts) {
    for (const post of posts) {
      const { id, title, slug, primary_author, tags } = post;
      const authorId = primary_author?.id || "1";

      const postExists = await prisma.post.findUnique({
        where: {
          id,
        },
      });
      if (!postExists && title) {
        await prisma.post.create({
          data: {
            id,
            title,
            slug,
            author: {
              connect: {
                authorId,
              },
            },
          },
        });
      }
    }
  }

  const updatedPosts = await prisma.post.findMany();

  const totalUpdates = { updatedTags, updatedPosts };
  res.status(200).json(totalUpdates);
}
