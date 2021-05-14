import { Box } from "@chakra-ui/layout"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import { FORM_ERROR, IncomeTypeForm } from "app/incometypes/components/IncomeTypeForm"
import updateIncomeType from "app/incometypes/mutations/updateIncomeType"
import getIncomeType from "app/incometypes/queries/getIncomeType"
import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

export const EditIncomeType = () => {
  const router = useRouter()
  const incomeTypeId = useParam("incomeTypeId", "number")
  const [incomeType, { setQueryData }] = useQuery(getIncomeType, { id: incomeTypeId })
  const [updateIncomeTypeMutation] = useMutation(updateIncomeType)

  return (
    <>
      <Box boxShadow="base" p="3">
        <IncomeTypeForm
          submitText="Update IncomeType"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateIncomeType}
          initialValues={incomeType}
          onSubmit={async (values) => {
            try {
              const updated = await updateIncomeTypeMutation({
                id: incomeType.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowIncomeTypePage({ incomeTypeId: updated.id }))
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

const EditIncomeTypePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditIncomeType />
      </Suspense>
    </div>
  )
}

EditIncomeTypePage.authenticate = true
EditIncomeTypePage.getLayout = (page) => (
  <DashboardLayout title="Edit IncomeType">{page}</DashboardLayout>
)

export default EditIncomeTypePage
