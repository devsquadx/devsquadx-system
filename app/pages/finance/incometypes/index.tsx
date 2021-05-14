import { Box, Button, chakra, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import getIncomeTypes from "app/incometypes/queries/getIncomeTypes"
import { BlitzPage, Link, Routes, usePaginatedQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

const ITEMS_PER_PAGE = 100

export const IncomeTypesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ incomeTypes, hasMore }] = usePaginatedQuery(getIncomeTypes, {
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
            <Th>Type</Th>
          </Tr>
        </Thead>
        <Tbody>
          {incomeTypes.map((incomeType) => (
            // <Link href={Routes.ShowCustomerPage({ incomeTypeId: incomeType.id })}>
            <Tr
              key={incomeType.id}
              onClick={() =>
                router.push(Routes.ShowIncomeTypePage({ incomeTypeId: incomeType.id }))
              }
              _hover={{
                bg: "gray.200",
                cursor: "pointer",
              }}
            >
              <Td>{incomeType.type}</Td>
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

const IncomeTypesPage: BlitzPage = () => {
  return (
    <>
      <div>
        <Box my="3" float="right">
          <Link href={Routes.NewIncomeTypePage()}>
            <chakra.a
              py="3"
              px="3"
              bg="blue.300"
              boxShadow="lg"
              color="gray.50"
              cursor="pointer"
              borderRadius="md"
            >
              Create Income Type
            </chakra.a>
          </Link>
        </Box>

        <Suspense fallback={<div>Loading...</div>}>
          <IncomeTypesList />
        </Suspense>
      </div>
    </>
  )
}

IncomeTypesPage.authenticate = true
IncomeTypesPage.getLayout = (page) => <DashboardLayout title="Income Types">{page}</DashboardLayout>

export default IncomeTypesPage
