import { Box, Button, chakra, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import getExpenses from "app/expenses/queries/getExpenses"
import { BlitzPage, Link, Routes, usePaginatedQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

const ITEMS_PER_PAGE = 100

export const ExpensesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ expenses, hasMore }] = usePaginatedQuery(getExpenses, {
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
          {expenses.map((expense) => (
            // <Link href={Routes.ShowExpensePage({ expenseId: expense.id })}>
            <Tr
              key={expense.id}
              onClick={() => router.push(Routes.ShowExpensePage({ expenseId: expense.id }))}
              _hover={{
                bg: "gray.200",
                cursor: "pointer",
              }}
            >
              <Td>{expense.description}</Td>
              <Td>{expense.amount}</Td>
              <Td>{expense.expenseType.type}</Td>
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

const ExpensesPage: BlitzPage = () => {
  return (
    <>
      <div>
        <Box my="3" float="right">
          <Link href={Routes.NewExpensePage()}>
            <chakra.a
              py="3"
              px="3"
              bg="blue.300"
              boxShadow="lg"
              color="gray.50"
              cursor="pointer"
              borderRadius="md"
            >
              Add Expense
            </chakra.a>
          </Link>
        </Box>

        <Suspense fallback={<div>Loading...</div>}>
          <ExpensesList />
        </Suspense>
      </div>
    </>
  )
}

ExpensesPage.authenticate = true
ExpensesPage.getLayout = (page) => <DashboardLayout title="Expenses">{page}</DashboardLayout>

export default ExpensesPage
