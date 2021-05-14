import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateExpenseType = z
  .object({
    id: z.number(),
    type: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateExpenseType),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const expenseType = await db.expenseType.update({ where: { id }, data })

    return expenseType
  }
)
