-- CreateTable
CREATE TABLE "IncomeType" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Income" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "incomeTypeId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseType" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "expenseTypeId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Income" ADD FOREIGN KEY ("incomeTypeId") REFERENCES "IncomeType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("expenseTypeId") REFERENCES "ExpenseType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
