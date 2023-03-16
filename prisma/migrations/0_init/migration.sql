-- CreateTable
CREATE TABLE "Movies" (
    "id" INTEGER NOT NULL,
    "title" TEXT,
    "director" TEXT,
    "year" SMALLINT,
    "series" TEXT,
    "date" DATE,
    "notes" TEXT,
    "mid" BIGINT,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

