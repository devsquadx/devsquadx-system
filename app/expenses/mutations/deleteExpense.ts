import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteExpense = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteExpense), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const expense = await db.expense.deleteMany({ where: { id } })

  return expense
})
