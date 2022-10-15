import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getSingleTweet } from "../../../lib/twitter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ((req.method = "GET")) {
    if (!req.query.id) {
      res.status(400).json({ error: "Missing id" });
      return;
    }
    const tweet = getSingleTweet(req.query.id.toString());
    res.status(200).json(tweet);
  }
}
