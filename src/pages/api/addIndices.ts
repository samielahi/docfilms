import { indexer } from "~/server/indexer";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Row } from "~/components/Archiver/types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const rows = req.body as Row[];

  const indicesToAdd = indexer.findIndicesToAdd(rows);
  indexer.writeToIndex(indicesToAdd);

  res
    .status(200)
    .json({ message: `${indicesToAdd.length} new indices added!` });
}
