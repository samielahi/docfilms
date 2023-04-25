import { indexer } from "~/server/indexer";
import { db } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Row } from "~/components/Archiver/types";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    response.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const rows = request.body as Row[];

  const indicesToAdd = indexer.findIndicesToAdd(rows);
  // indexer.writeToIndex(indicesToAdd);

  // const moviesAddedToArchive = db.insertRecords(rows);

  const message = indicesToAdd.length
    ? `${indicesToAdd.length} new search indices added!`
    : "No new movies or directors to add to the search index!";

  response.status(200).json({ message: message });
}
