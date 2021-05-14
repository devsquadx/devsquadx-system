import { Box } from "@chakra-ui/layout"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import { CustomerForm, FORM_ERROR } from "app/customers/components/CustomerForm"
import updateCustomer from "app/customers/mutations/updateCustomer"
import getCustomer from "app/customers/queries/getCustomer"
import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const EditCustomer = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [customer, { setQueryData }] = useQuery(getCustomer, { id: customerId })
  const [updateCustomerMutation] = useMutation(updateCustomer)

  return (
    <>
      <Box boxShadow="base" p="3">
        <CustomerForm
          submitText="Update Customer"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCustomer}
          initialValues={customer}
          onSubmit={async (values) => {
            try {
              const updated = await updateCustomerMutation({
                id: customer.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowCustomerPage({ customerId: updated.id }))
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

const EditCustomerPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCustomer />
      </Suspense>
    </div>
  )
}

EditCustomerPage.authenticate = true
EditCustomerPage.getLayout = (page) => (
  <DashboardLayout title="Edit Customer">{page}</DashboardLayout>
)

export default EditCustomerPage
