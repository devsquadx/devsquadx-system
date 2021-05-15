import { Box } from "@chakra-ui/layout"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import { FORM_ERROR, ExpenseForm } from "app/expenses/components/ExpenseForm"
import updateExpense from "app/expenses/mutations/updateExpense"
import getExpense from "app/expenses/queries/getExpense"
import getExpenseTypes from "app/expensetypes/queries/getExpenseTypes"
import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const EditExpense = () => {
  const router = useRouter()
  const expenseId = useParam("expenseId", "number")
  const [expense, { setQueryData }] = useQuery(getExpense, { id: expenseId })
  const [{ expenseTypes }] = useQuery(getExpenseTypes, { orderBy: { id: "desc" } })
  const [updateExpenseMutation] = useMutation(updateExpense)

  return (
    <>
      <Box boxShadow="base" p="3">
        <ExpenseForm
          submitText="Update Expense"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateExpense}
          mutators={{
            // expect (field, value) args from the mutator
            setValue: ([field, value], state, { changeValue }) => {
              changeValue(state, field, () => value)
            },
          }}
          expenseTypes={expenseTypes}
          initialValues={expense}
          onSubmit={async (values) => {
            try {
              const updated = await updateExpenseMutation({
                id: expense.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowExpensePage({ expenseId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Box>
    </>
  )
}

const EditExpensePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditExpense />
      </Suspense>
    </div>
  )
}

EditExpensePage.authenticate = true
EditExpensePage.getLayout = (page) => <DashboardLayout title="Edit Expense">{page}</DashboardLayout>

export default EditExpensePage
