-- CreateTable
CREATE TABLE "Movies" (
    "id" BIGINT NOT NULL,
    "title" TEXT,
    "director" TEXT,
    "year" SMALLINT,
    "series" TEXT,
    "date" DATE,
    "notes" TEXT,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

