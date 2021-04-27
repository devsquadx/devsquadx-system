import { Box, Button, Heading, Text } from "@chakra-ui/react"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import getCustomer from "app/customers/queries/getCustomer"
import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const Customer = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [deleteCustomerMutation] = useMutation(deleteCustomer)
  const [customer] = useQuery(getCustomer, { id: customerId })

  return (
    <>
      <Box p="4" boxShadow="base" fontFamily="Poppins">
        <Heading fontSize="2xl" fontFamily="Poppins">
          {customer.name}
        </Heading>
        <Box py="10">
          <Text mb="2">Email Address - {customer.email}</Text>
          <Text>Phone Number - {customer.phoneNumber}</Text>
        </Box>
        <Button
          onClick={() => {
            router.push(Routes.EditCustomerPage({ customerId: customer.id }))
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
              await deleteCustomerMutation({ id: customer.id })
              router.push(Routes.CustomersPage())
            }
          }}
        >
          Delete
        </Button>
      </Box>
    </>
  )
}

const ShowCustomerPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Customer />
      </Suspense>
    </div>
  )
}

ShowCustomerPage.authenticate = true
ShowCustomerPage.getLayout = (page) => (
  <DashboardLayout title="Customer Details">{page}</DashboardLayout>
)

export default ShowCustomerPage
