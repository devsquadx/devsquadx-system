import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetExpenseTypesInput
  extends Pick<Prisma.ExpenseTypeFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetExpenseTypesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: expenseTypes, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.expenseType.count({ where }),
      query: (paginateArgs) => db.expenseType.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      expenseTypes,
      nextPage,
      hasMore,
      count,
    }
  }
)
