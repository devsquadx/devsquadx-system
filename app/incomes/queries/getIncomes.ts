import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetIncomesInput
  extends Pick<Prisma.IncomeFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetIncomesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: incomes, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.income.count({ where }),
      query: (paginateArgs) =>
        db.income.findMany({ ...paginateArgs, where, orderBy, include: { incomeType: true } }),
    })

    return {
      incomes,
      nextPage,
      hasMore,
      count,
    }
  }
)
