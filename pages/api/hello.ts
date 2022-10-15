import { NextApiRequest, NextApiResponse } from "next";
import { getTestPost } from "../../lib/ghost";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let post;
  try {
    post = await getTestPost();
  } catch (error) {
    console.error(error);
  }

  res.status(200).json(post);
}
