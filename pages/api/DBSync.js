import { getAllPostsForHome, getAllTags } from "../../lib/ghost";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  await prisma.post.deleteMany();

  let tags;
  try {
    tags = await getAllTags();
  } catch (error) {
    console.error(error);
  }

  for (const tag of tags) {
    const { id, name, slug } = tag;
    const tagExists = await prisma.tags.findUnique({
      where: {
        id,
      },
    });
    if (!tagExists) {
      await prisma.tags.create({
        data: {
          id,
          name,
          slug,
        },
      });
    }
  }

  const updatedTags = await prisma.tags.findMany();

  let posts;
  try {
    posts = await getAllPostsForHome();
  } catch (error) {
    console.error(error);
  }

  for (const post of posts) {
    const { id, title, slug, primary_author, tags } = post;
    const authorId = primary_author.id;

    const postExists = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!postExists) {
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

  const updatedPosts = await prisma.post.findMany();

  const totalUpdates = { updatedTags, updatedPosts };
  res.status(200).json(totalUpdates);
}
