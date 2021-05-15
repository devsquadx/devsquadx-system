import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateExpense = z
  .object({
    id: z.number(),
    description: z.string(),
    amount: z.number(),
    expenseTypeId: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateExpense),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const expense = await db.expense.update({ where: { id }, data, include: { expenseType: true } })

    return expense
  }
)
