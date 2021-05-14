import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateExpenseType = z
  .object({
    type: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(CreateExpenseType),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const expenseType = await db.expenseType.create({ data: input })

    return expenseType
  }
)
