import { Box } from "@chakra-ui/layout"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import { FORM_ERROR, IncomeForm } from "app/incomes/components/IncomeForm"
import createIncome from "app/incomes/mutations/createIncome"
import getIncomeTypes from "app/incometypes/queries/getIncomeTypes"
import { BlitzPage, useMutation, useQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

export const NewIncome = () => {
  const router = useRouter()
  const [createIncomeMutation] = useMutation(createIncome)
  const [{ incomeTypes }] = useQuery(getIncomeTypes, { orderBy: { id: "asc" } })

  return (
    <Box boxShadow="base" p="3">
      <IncomeForm
        incomeTypes={incomeTypes}
        mutators={{
          // expect (field, value) args from the mutator
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value)
          },
        }}
        submitText="Create Income"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateIncome}
        // initialValues={{}}
        onSubmit={async (values) => {
          console.log(values)
          // const data = {
          //   name: values.name,
          //   incomeTypeId: values.incomeTypeId.value,
          // }
          try {
            const income = await createIncomeMutation(values)
            router.push(`/finance/incomes/${income.id}`)
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

const NewIncomePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewIncome />
      </Suspense>
    </div>
  )
}

NewIncomePage.authenticate = true
NewIncomePage.getLayout = (page) => (
  <DashboardLayout title={"Create New Income"}>{page}</DashboardLayout>
)

export default NewIncomePage
