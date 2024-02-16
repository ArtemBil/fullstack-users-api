-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" VARCHAR(30) NOT NULL,
    "photo" VARCHAR(255) NOT NULL,
    "position" VARCHAR(20) NOT NULL,
    "position_id" INTEGER NOT NULL,
    "registration_timestamp" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
