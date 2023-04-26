import { indexer } from "~/server/indexer";
import { db } from "~/server/db";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Row } from "~/components/Archiver/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2));
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const rows = req.body as Row[];
  const archiveMessage = createRecords(rows);
  const indexMessage = createIndices(rows);

  res.status(200).json({ message: [archiveMessage, indexMessage] });
}

function createIndices(rows: Row[]): string {
  const indicesToAdd = indexer.findIndicesToAdd(rows);
  // indexer.writeToIndex(indicesToAdd);

  const message = indicesToAdd.length
    ? `${indicesToAdd.length} new search indices added.`
    : "No new movies or directors to add to the search index.";

  return message;
}

function createRecords(rows: Row[]) {
  // const count = await db.insertRecords(rows);

  // const message = count
  //   ? `${count} new movies added to the archive.`
  //   : "No new movies or directors to add to the archive.";

  return "2 new movies added to the archive";
}
