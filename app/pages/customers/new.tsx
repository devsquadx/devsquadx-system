import { Box } from "@chakra-ui/layout"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import { CustomerForm, FORM_ERROR } from "app/customers/components/CustomerForm"
import createCustomer from "app/customers/mutations/createCustomer"
import { BlitzPage, useMutation, useRouter } from "blitz"
import React, { Suspense } from "react"

interface Props {
  returnFunc?: any
}

export const NewCustomer: React.FC<Props> = ({ returnFunc }) => {
  const router = useRouter()
  const [createCustomerMutation] = useMutation(createCustomer)

  return (
    <Box boxShadow="base" p="3">
      <CustomerForm
        submitText="Create Customer"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCustomer}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const customer = await createCustomerMutation(values)
            if (returnFunc) {
              returnFunc(false)
            } else {
              router.push(`/customers/${customer.id}`)
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

const NewCustomerPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewCustomer />
      </Suspense>
    </div>
  )
}

NewCustomerPage.authenticate = true
NewCustomerPage.getLayout = (page) => (
  <DashboardLayout title={"Create New Customer"}>{page}</DashboardLayout>
)

export default NewCustomerPage
