import { Box } from "@chakra-ui/layout"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import { FORM_ERROR, IncomeForm } from "app/incomes/components/IncomeForm"
import updateIncome from "app/incomes/mutations/updateIncome"
import getIncome from "app/incomes/queries/getIncome"
import getIncomeTypes from "app/incometypes/queries/getIncomeTypes"
import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const EditIncome = () => {
  const router = useRouter()
  const incomeId = useParam("incomeId", "number")
  const [income, { setQueryData }] = useQuery(getIncome, { id: incomeId })
  const [{ incomeTypes }] = useQuery(getIncomeTypes, { orderBy: { id: "desc" } })
  const [updateIncomeMutation] = useMutation(updateIncome)

  return (
    <>
      <Box boxShadow="base" p="3">
        <IncomeForm
          submitText="Update Income"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateIncome}
          mutators={{
            // expect (field, value) args from the mutator
            setValue: ([field, value], state, { changeValue }) => {
              changeValue(state, field, () => value)
            },
          }}
          incomeTypes={incomeTypes}
          initialValues={income}
          onSubmit={async (values) => {
            try {
              const updated = await updateIncomeMutation({
                id: income.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowIncomePage({ incomeId: updated.id }))
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

const EditIncomePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditIncome />
      </Suspense>
    </div>
  )
}

EditIncomePage.authenticate = true
EditIncomePage.getLayout = (page) => <DashboardLayout title="Edit Income">{page}</DashboardLayout>

export default EditIncomePage
