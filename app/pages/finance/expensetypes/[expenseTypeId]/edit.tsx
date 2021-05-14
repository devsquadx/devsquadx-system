import { Box } from "@chakra-ui/layout"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import { FORM_ERROR, ExpenseTypeForm } from "app/expensetypes/components/ExpenseTypeForm"
import updateExpenseType from "app/expensetypes/mutations/updateExpenseType"
import getExpenseType from "app/expensetypes/queries/getExpenseType"
import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

export const EditExpenseType = () => {
  const router = useRouter()
  const expenseTypeId = useParam("expenseTypeId", "number")
  const [expenseType, { setQueryData }] = useQuery(getExpenseType, { id: expenseTypeId })
  const [updateExpenseTypeMutation] = useMutation(updateExpenseType)

  return (
    <>
      <Box boxShadow="base" p="3">
        <ExpenseTypeForm
          submitText="Update ExpenseType"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateExpenseType}
          initialValues={expenseType}
          onSubmit={async (values) => {
            try {
              const updated = await updateExpenseTypeMutation({
                id: expenseType.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowExpenseTypePage({ expenseTypeId: updated.id }))
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

const EditExpenseTypePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditExpenseType />
      </Suspense>
    </div>
  )
}

EditExpenseTypePage.authenticate = true
EditExpenseTypePage.getLayout = (page) => (
  <DashboardLayout title="Edit ExpenseType">{page}</DashboardLayout>
)

export default EditExpenseTypePage
