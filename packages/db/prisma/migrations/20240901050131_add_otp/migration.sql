/*
  Warnings:

  - Added the required column `email` to the `otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "otp" ADD COLUMN     "email" TEXT NOT NULL;
