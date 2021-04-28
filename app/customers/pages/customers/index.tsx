import { Box, Button, chakra, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import getCustomers from "app/customers/queries/getCustomers"
import { BlitzPage, Link, Routes, usePaginatedQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

const ITEMS_PER_PAGE = 100

export const CustomersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ customers, hasMore }] = usePaginatedQuery(getCustomers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone Number</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customers.map((customer) => (
            // <Link href={Routes.ShowCustomerPage({ customerId: customer.id })}>
            <Tr
              key={customer.id}
              onClick={() => router.push(Routes.ShowCustomerPage({ customerId: customer.id }))}
              _hover={{
                bg: "gray.200",
                cursor: "pointer",
              }}
            >
              <Td>{customer.name}</Td>
              <Td>{customer.email}</Td>
              <Td>{customer.phoneNumber}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Box mt="5">
        <Button disabled={page === 0} onClick={goToPreviousPage} m="3">
          Previous
        </Button>
        <Button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </Button>
      </Box>
    </div>
  )
}

const CustomersPage: BlitzPage = () => {
  return (
    <>
      <div>
        <Box my="3" float="right">
          <Link href={Routes.NewCustomerPage()}>
            <chakra.a
              py="3"
              px="3"
              bg="blue.300"
              boxShadow="lg"
              color="gray.50"
              cursor="pointer"
              borderRadius="md"
            >
              Create Customer
            </chakra.a>
          </Link>
        </Box>

        <Suspense fallback={<div>Loading...</div>}>
          <CustomersList />
        </Suspense>
      </div>
    </>
  )
}

CustomersPage.authenticate = true
CustomersPage.getLayout = (page) => <DashboardLayout title="Customers">{page}</DashboardLayout>

export default CustomersPage
