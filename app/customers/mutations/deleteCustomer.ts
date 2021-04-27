import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteCustomer = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteCustomer), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const customer = await db.customer.deleteMany({ where: { id } })

  return customer
})
