import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateIncome = z
  .object({
    description: z.string(),
    amount: z.number(),
    incomeTypeId: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateIncome), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const income = await db.income.create({ data: input })

  return income
})
