import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateIncomeType = z
  .object({
    type: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(CreateIncomeType),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const incomeType = await db.incomeType.create({ data: input })

    return incomeType
  }
)
