import { prisma } from "~/server/db";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

type Credential = {
  username: string;
  password: string;
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    response.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { username, password } = request.body as Credential;

  // response.status(200).json({ message: [archiveMessage, indexMessage] });
}
