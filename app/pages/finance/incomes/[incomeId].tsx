import { Box, Button, Heading, Text } from "@chakra-ui/react"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import deleteIncome from "app/incomes/mutations/deleteIncome"
import getIncome from "app/incomes/queries/getIncome"
import getIncomeType from "app/incometypes/queries/getIncomeType"
import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const Income = () => {
  const router = useRouter()
  const incomeId = useParam("incomeId", "number")
  const [deleteIncomeMutation] = useMutation(deleteIncome)
  const [income] = useQuery(getIncome, { id: incomeId })
  const [incomeType] = useQuery(getIncomeType, { id: income.incomeTypeId })

  return (
    <>
      <Box p="4" boxShadow="base" fontFamily="Poppins">
        <Heading fontSize="2xl" fontFamily="Poppins">
          {income.description}
        </Heading>
        <Box py="10">
          <Text>Amount - {income.amount}</Text>
          <Text>Type - {incomeType.type}</Text>
        </Box>
        <Button
          onClick={() => {
            router.push(Routes.EditIncomePage({ incomeId: income.id }))
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
              await deleteIncomeMutation({ id: income.id })
              router.push(Routes.IncomesPage())
            }
          }}
        >
          Delete
        </Button>
      </Box>
    </>
  )
}

const ShowIncomePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Income />
      </Suspense>
    </div>
  )
}

ShowIncomePage.authenticate = true
ShowIncomePage.getLayout = (page) => (
  <DashboardLayout title="Income Details">{page}</DashboardLayout>
)

export default ShowIncomePage
