-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "amount" DECIMAL(18,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "amount" DECIMAL(18,2) NOT NULL DEFAULT 0;
