import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteExpenseType = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteExpenseType),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const expenseType = await db.expenseType.deleteMany({ where: { id } })

    return expenseType
  }
)
