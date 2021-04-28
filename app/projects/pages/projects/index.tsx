import { Box, Button, chakra, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import getProjects from "app/projects/queries/getProjects"
import { BlitzPage, Link, Routes, usePaginatedQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

const ITEMS_PER_PAGE = 100

export const ProjectsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ projects, hasMore }] = usePaginatedQuery(getProjects, {
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
            <Th>Project</Th>
            <Th>Customer</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.map((project) => (
            // <Link href={Routes.ShowProjectPage({ projectId: project.id })}>
            <Tr
              key={project.id}
              onClick={() => router.push(Routes.ShowProjectPage({ projectId: project.id }))}
              _hover={{
                bg: "gray.200",
                cursor: "pointer",
              }}
            >
              <Td>{project.name}</Td>
              <Td>{project.customer.name}</Td>
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

const ProjectsPage: BlitzPage = () => {
  return (
    <>
      <div>
        <Box my="3" float="right">
          <Link href={Routes.NewProjectPage()}>
            <chakra.a
              py="3"
              px="3"
              bg="blue.300"
              boxShadow="lg"
              color="gray.50"
              cursor="pointer"
              borderRadius="md"
            >
              Create Project
            </chakra.a>
          </Link>
        </Box>

        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsList />
        </Suspense>
      </div>
    </>
  )
}

ProjectsPage.authenticate = true
ProjectsPage.getLayout = (page) => <DashboardLayout title="Projects">{page}</DashboardLayout>

export default ProjectsPage
