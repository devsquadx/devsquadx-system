import { Box } from "@chakra-ui/layout"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import { FORM_ERROR, ExpenseForm } from "app/expenses/components/ExpenseForm"
import createExpense from "app/expenses/mutations/createExpense"
import getExpenseTypes from "app/expensetypes/queries/getExpenseTypes"
import { BlitzPage, useMutation, useQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

export const NewExpense = () => {
  const router = useRouter()
  const [createExpenseMutation] = useMutation(createExpense)
  const [{ expenseTypes }] = useQuery(getExpenseTypes, { orderBy: { id: "asc" } })

  return (
    <Box boxShadow="base" p="3">
      <ExpenseForm
        expenseTypes={expenseTypes}
        mutators={{
          // expect (field, value) args from the mutator
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value)
          },
        }}
        submitText="Create Expense"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateExpense}
        // initialValues={{}}
        onSubmit={async (values) => {
          console.log(values)
          // const data = {
          //   name: values.name,
          //   expenseTypeId: values.expenseTypeId.value,
          // }
          try {
            const expense = await createExpenseMutation(values)
            router.push(`/finance/expenses/${expense.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </Box>
  )
}

const NewExpensePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewExpense />
      </Suspense>
    </div>
  )
}

NewExpensePage.authenticate = true
NewExpensePage.getLayout = (page) => (
  <DashboardLayout title={"Create New Expense"}>{page}</DashboardLayout>
)

export default NewExpensePage
