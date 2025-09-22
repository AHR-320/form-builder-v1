/*
  Warnings:

  - A unique constraint covering the columns `[userId,name,shareURL]` on the table `Form` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Form_userId_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Form_userId_name_shareURL_key" ON "public"."Form"("userId", "name", "shareURL");
