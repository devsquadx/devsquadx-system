import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetIncomeTypesInput
  extends Pick<Prisma.IncomeTypeFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetIncomeTypesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: incomeTypes, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.incomeType.count({ where }),
      query: (paginateArgs) => db.incomeType.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      incomeTypes,
      nextPage,
      hasMore,
      count,
    }
  }
)
