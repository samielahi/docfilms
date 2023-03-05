-- CreateTable
CREATE TABLE "Movies" (
    "title" TEXT,
    "director" TEXT,
    "year" SMALLINT,
    "series" TEXT,
    "date" DATE,
    "notes" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

