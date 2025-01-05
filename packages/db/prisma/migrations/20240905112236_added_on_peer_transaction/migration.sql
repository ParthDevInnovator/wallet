/*
  Warnings:

  - You are about to drop the `otp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "otp";

-- CreateTable
CREATE TABLE "OnPeerTransaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "fromPeerId" INTEGER NOT NULL,
    "toPeerId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "OnPeerTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OnPeerTransaction" ADD CONSTRAINT "OnPeerTransaction_fromPeerId_fkey" FOREIGN KEY ("fromPeerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnPeerTransaction" ADD CONSTRAINT "OnPeerTransaction_toPeerId_fkey" FOREIGN KEY ("toPeerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnPeerTransaction" ADD CONSTRAINT "OnPeerTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
