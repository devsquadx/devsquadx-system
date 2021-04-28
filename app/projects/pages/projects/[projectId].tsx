import { Box, Button, Heading, Text } from "@chakra-ui/react"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import getCustomer from "app/customers/queries/getCustomer"
import deleteProject from "app/projects/mutations/deleteProject"
import getProject from "app/projects/queries/getProject"
import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const Project = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const [deleteProjectMutation] = useMutation(deleteProject)
  const [project] = useQuery(getProject, { id: projectId })
  const [customer] = useQuery(getCustomer, { id: project.customerId })

  return (
    <>
      <Box p="4" boxShadow="base" fontFamily="Poppins">
        <Heading fontSize="2xl" fontFamily="Poppins">
          {project.name}
        </Heading>
        <Box py="10">
          <Text>Client - {customer.name}</Text>
        </Box>
        <Button
          onClick={() => {
            router.push(Routes.EditProjectPage({ projectId: project.id }))
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
              await deleteProjectMutation({ id: project.id })
              router.push(Routes.ProjectsPage())
            }
          }}
        >
          Delete
        </Button>
      </Box>
    </>
  )
}

const ShowProjectPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Project />
      </Suspense>
    </div>
  )
}

ShowProjectPage.authenticate = true
ShowProjectPage.getLayout = (page) => (
  <DashboardLayout title="Project Details">{page}</DashboardLayout>
)

export default ShowProjectPage
