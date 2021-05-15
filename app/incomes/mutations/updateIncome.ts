import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateIncome = z
  .object({
    id: z.number(),
    description: z.string(),
    amount: z.number(),
    incomeTypeId: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateIncome),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const income = await db.income.update({ where: { id }, data, include: { incomeType: true } })

    return income
  }
)
