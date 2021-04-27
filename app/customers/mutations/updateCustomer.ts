import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateCustomer = z
  .object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateCustomer),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const customer = await db.customer.update({ where: { id }, data })

    return customer
  }
)
