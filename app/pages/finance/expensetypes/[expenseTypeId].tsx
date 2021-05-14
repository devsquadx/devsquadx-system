import { Box, Button, Heading } from "@chakra-ui/react"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import deleteExpenseType from "app/expensetypes/mutations/deleteExpenseType"
import getExpenseType from "app/expensetypes/queries/getExpenseType"
import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const ExpenseType = () => {
  const router = useRouter()
  const expenseTypeId = useParam("expenseTypeId", "number")
  const [deleteExpenseTypeMutation] = useMutation(deleteExpenseType)
  const [expenseType] = useQuery(getExpenseType, { id: expenseTypeId })

  return (
    <>
      <Box p="4" boxShadow="base" fontFamily="Poppins">
        <Heading fontSize="2xl" fontFamily="Poppins">
          {expenseType.type}
        </Heading>
        <Button
          onClick={() => {
            router.push(Routes.EditExpenseTypePage({ expenseTypeId: expenseType.id }))
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
              await deleteExpenseTypeMutation({ id: expenseType.id })
              router.push(Routes.ExpenseTypesPage())
            }
          }}
        >
          Delete
        </Button>
      </Box>
    </>
  )
}

const ShowExpenseTypePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ExpenseType />
      </Suspense>
    </div>
  )
}

ShowExpenseTypePage.authenticate = true
ShowExpenseTypePage.getLayout = (page) => (
  <DashboardLayout title="ExpenseType Details">{page}</DashboardLayout>
)

export default ShowExpenseTypePage
