import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetExpenseType = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetExpenseType), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const expenseType = await db.expenseType.findFirst({ where: { id } })

  if (!expenseType) throw new NotFoundError()

  return expenseType
})
