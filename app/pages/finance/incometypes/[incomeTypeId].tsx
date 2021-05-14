import { Box, Button, Heading } from "@chakra-ui/react"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import deleteIncomeType from "app/incometypes/mutations/deleteIncomeType"
import getIncomeType from "app/incometypes/queries/getIncomeType"
import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const IncomeType = () => {
  const router = useRouter()
  const incomeTypeId = useParam("incomeTypeId", "number")
  const [deleteIncomeTypeMutation] = useMutation(deleteIncomeType)
  const [incomeType] = useQuery(getIncomeType, { id: incomeTypeId })

  return (
    <>
      <Box p="4" boxShadow="base" fontFamily="Poppins">
        <Heading fontSize="2xl" fontFamily="Poppins">
          {incomeType.type}
        </Heading>
        <Button
          onClick={() => {
            router.push(Routes.EditIncomeTypePage({ incomeTypeId: incomeType.id }))
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
              await deleteIncomeTypeMutation({ id: incomeType.id })
              router.push(Routes.IncomeTypesPage())
            }
          }}
        >
          Delete
        </Button>
      </Box>
    </>
  )
}

const ShowIncomeTypePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <IncomeType />
      </Suspense>
    </div>
  )
}

ShowIncomeTypePage.authenticate = true
ShowIncomeTypePage.getLayout = (page) => (
  <DashboardLayout title="IncomeType Details">{page}</DashboardLayout>
)

export default ShowIncomeTypePage
