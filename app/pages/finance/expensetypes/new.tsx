import { Box } from "@chakra-ui/layout"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import { ExpenseTypeForm, FORM_ERROR } from "app/expensetypes/components/ExpenseTypeForm"
import createExpenseType from "app/expensetypes/mutations/createExpenseType"
import { BlitzPage, useMutation, useRouter } from "blitz"
import React, { Suspense } from "react"

interface Props {
  returnFunc?: any
}

export const NewExpenseType: React.FC<Props> = ({ returnFunc }) => {
  const router = useRouter()
  const [createExpenseTypeMutation] = useMutation(createExpenseType)

  return (
    <Box boxShadow="base" p="3">
      <ExpenseTypeForm
        submitText="Create ExpenseType"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateExpenseType}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const expenseType = await createExpenseTypeMutation(values)
            if (returnFunc) {
              returnFunc(false)
            } else {
              router.push(`/finance/expensetypes/${expenseType.id}`)
            }
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

const NewExpenseTypePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewExpenseType />
      </Suspense>
    </div>
  )
}

NewExpenseTypePage.authenticate = true
NewExpenseTypePage.getLayout = (page) => (
  <DashboardLayout title={"Create New ExpenseType"}>{page}</DashboardLayout>
)

export default NewExpenseTypePage
