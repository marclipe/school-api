/*
  Warnings:

  - Added the required column `school_id` to the `attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `attendances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attendances" ADD COLUMN     "school_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
