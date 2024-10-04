-- DropIndex
DROP INDEX "UserAddress_id_key";

-- AlterTable
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("id");
