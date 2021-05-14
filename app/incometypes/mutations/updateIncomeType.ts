import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateIncomeType = z
  .object({
    id: z.number(),
    type: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateIncomeType),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const incomeType = await db.incomeType.update({ where: { id }, data })

    return incomeType
  }
)
