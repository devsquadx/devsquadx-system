import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteIncome = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteIncome), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const income = await db.income.deleteMany({ where: { id } })

  return income
})
