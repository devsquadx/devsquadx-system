import { Box, Button, chakra, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import getExpenseTypes from "app/expensetypes/queries/getExpenseTypes"
import { BlitzPage, Link, Routes, usePaginatedQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

const ITEMS_PER_PAGE = 100

export const ExpenseTypesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ expenseTypes, hasMore }] = usePaginatedQuery(getExpenseTypes, {
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
            <Th>Type</Th>
          </Tr>
        </Thead>
        <Tbody>
          {expenseTypes.map((expenseType) => (
            // <Link href={Routes.ShowCustomerPage({ expenseTypeId: expenseType.id })}>
            <Tr
              key={expenseType.id}
              onClick={() =>
                router.push(Routes.ShowExpenseTypePage({ expenseTypeId: expenseType.id }))
              }
              _hover={{
                bg: "gray.200",
                cursor: "pointer",
              }}
            >
              <Td>{expenseType.type}</Td>
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

const ExpenseTypesPage: BlitzPage = () => {
  return (
    <>
      <div>
        <Box my="3" float="right">
          <Link href={Routes.NewExpenseTypePage()}>
            <chakra.a
              py="3"
              px="3"
              bg="blue.300"
              boxShadow="lg"
              color="gray.50"
              cursor="pointer"
              borderRadius="md"
            >
              Create Expense Type
            </chakra.a>
          </Link>
        </Box>

        <Suspense fallback={<div>Loading...</div>}>
          <ExpenseTypesList />
        </Suspense>
      </div>
    </>
  )
}

ExpenseTypesPage.authenticate = true
ExpenseTypesPage.getLayout = (page) => (
  <DashboardLayout title="Expense Types">{page}</DashboardLayout>
)

export default ExpenseTypesPage
