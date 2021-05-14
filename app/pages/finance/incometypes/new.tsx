import { Box } from "@chakra-ui/layout"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import { FORM_ERROR, IncomeTypeForm } from "app/incometypes/components/IncomeTypeForm"
import createIncomeType from "app/incometypes/mutations/createIncomeType"
import { BlitzPage, useMutation, useRouter } from "blitz"
import React, { Suspense } from "react"

interface Props {
  returnFunc?: any
}

export const NewIncomeType: React.FC<Props> = ({ returnFunc }) => {
  const router = useRouter()
  const [createIncomeTypeMutation] = useMutation(createIncomeType)

  return (
    <Box boxShadow="base" p="3">
      <IncomeTypeForm
        submitText="Create IncomeType"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateIncomeType}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const incomeType = await createIncomeTypeMutation(values)
            if (returnFunc) {
              returnFunc(false)
            } else {
              router.push(`/finance/incometypes/${incomeType.id}`)
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

const NewIncomeTypePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewIncomeType />
      </Suspense>
    </div>
  )
}

NewIncomeTypePage.authenticate = true
NewIncomeTypePage.getLayout = (page) => (
  <DashboardLayout title={"Create New IncomeType"}>{page}</DashboardLayout>
)

export default NewIncomeTypePage
