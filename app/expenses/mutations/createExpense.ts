import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateExpense = z
  .object({
    description: z.string(),
    amount: z.number(),
    expenseTypeId: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateExpense), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const expense = await db.expense.create({ data: input })

  return expense
})
