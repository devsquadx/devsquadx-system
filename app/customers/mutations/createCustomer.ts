import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateCustomer = z
  .object({
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateCustomer), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const customer = await db.customer.create({ data: input })

  return customer
})
