import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetIncomeType = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetIncomeType), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const incomeType = await db.incomeType.findFirst({ where: { id } })

  if (!incomeType) throw new NotFoundError()

  return incomeType
})
