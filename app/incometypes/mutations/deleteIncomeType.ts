import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteIncomeType = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteIncomeType),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const incomeType = await db.incomeType.deleteMany({ where: { id } })

    return incomeType
  }
)
