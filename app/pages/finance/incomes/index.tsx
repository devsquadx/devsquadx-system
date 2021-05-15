import { Box, Button, chakra, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import getIncomes from "app/incomes/queries/getIncomes"
import { BlitzPage, Link, Routes, usePaginatedQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

const ITEMS_PER_PAGE = 100

export const IncomesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ incomes, hasMore }] = usePaginatedQuery(getIncomes, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <Table>
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Amount</Th>
            <Th>Type</Th>
          </Tr>
        </Thead>
        <Tbody>
          {incomes.map((income) => (
            // <Link href={Routes.ShowIncomePage({ incomeId: income.id })}>
            <Tr
              key={income.id}
              onClick={() => router.push(Routes.ShowIncomePage({ incomeId: income.id }))}
              _hover={{
                bg: "gray.200",
                cursor: "pointer",
              }}
            >
              <Td>{income.description}</Td>
              <Td>{income.amount}</Td>
              <Td>{income.incomeType.type}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Box mt="5">
        <Button disabled={page === 0} onClick={goToPreviousPage} m="3">
          Previous
        </Button>
        <Button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </Button>
      </Box>
    </div>
  )
}

const IncomesPage: BlitzPage = () => {
  return (
    <>
      <div>
        <Box my="3" float="right">
          <Link href={Routes.NewIncomePage()}>
            <chakra.a
              py="3"
              px="3"
              bg="blue.300"
              boxShadow="lg"
              color="gray.50"
              cursor="pointer"
              borderRadius="md"
            >
              Add Income
            </chakra.a>
          </Link>
        </Box>

        <Suspense fallback={<div>Loading...</div>}>
          <IncomesList />
        </Suspense>
      </div>
    </>
  )
}

IncomesPage.authenticate = true
IncomesPage.getLayout = (page) => <DashboardLayout title="Incomes">{page}</DashboardLayout>

export default IncomesPage
