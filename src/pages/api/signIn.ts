import { prisma } from "~/server/db";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

type Credential = {
  username: string;
  password: string;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    response.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { username, password } = request.body as Credential;

  const hash = await prisma.users.findFirst({
    select: {
      password: true,
    },
    where: {
      username: {
        equals: username,
      },
    },
  });

  const success = await bcrypt.compare(password, hash?.password!);

  if (success) {
    response.status(200).json({ message: "successfully signed in!" });
  } else {
    response.status(401).json({ message: "invalid username or password" });
  }
}
