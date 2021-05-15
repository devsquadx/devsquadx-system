import { Box, Button, Heading, Text } from "@chakra-ui/react"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import deleteExpense from "app/expenses/mutations/deleteExpense"
import getExpense from "app/expenses/queries/getExpense"
import getExpenseType from "app/expensetypes/queries/getExpenseType"
import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const Expense = () => {
  const router = useRouter()
  const expenseId = useParam("expenseId", "number")
  const [deleteExpenseMutation] = useMutation(deleteExpense)
  const [expense] = useQuery(getExpense, { id: expenseId })
  const [expenseType] = useQuery(getExpenseType, { id: expense.expenseTypeId })

  return (
    <>
      <Box p="4" boxShadow="base" fontFamily="Poppins">
        <Heading fontSize="2xl" fontFamily="Poppins">
          {expense.description}
        </Heading>
        <Box py="10">
          <Text>Amount - {expense.amount}</Text>
          <Text>Type - {expenseType.type}</Text>
        </Box>
        <Button
          onClick={() => {
            router.push(Routes.EditExpensePage({ expenseId: expense.id }))
          }}
          mx="2"
          bg="yellow.300"
        >
          Edit
        </Button>

        <Button
          bg="red.300"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteExpenseMutation({ id: expense.id })
              router.push(Routes.ExpensesPage())
            }
          }}
        >
          Delete
        </Button>
      </Box>
    </>
  )
}

const ShowExpensePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Expense />
      </Suspense>
    </div>
  )
}

ShowExpensePage.authenticate = true
ShowExpensePage.getLayout = (page) => (
  <DashboardLayout title="Expense Details">{page}</DashboardLayout>
)

export default ShowExpensePage
