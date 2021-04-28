import { Box } from "@chakra-ui/layout"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import getCustomers from "app/customers/queries/getCustomers"
import { FORM_ERROR, ProjectForm } from "app/projects/components/ProjectForm"
import createProject from "app/projects/mutations/createProject"
import { BlitzPage, useMutation, useQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

export const NewProject = () => {
  const router = useRouter()
  const [createProjectMutation] = useMutation(createProject)
  const [{ customers }] = useQuery(getCustomers, { orderBy: { id: "asc" } })

  return (
    <Box boxShadow="base" p="3">
      <ProjectForm
        customers={customers}
        mutators={{
          // expect (field, value) args from the mutator
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value)
          },
        }}
        submitText="Create Project"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateProject}
        // initialValues={{}}
        onSubmit={async (values) => {
          // console.log(values)
          // const data = {
          //   name: values.name,
          //   customerId: values.customerId.value,
          // }
          try {
            const project = await createProjectMutation(values)
            router.push(`/projects/${project.id}`)
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

const NewProjectPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewProject />
      </Suspense>
    </div>
  )
}

NewProjectPage.authenticate = true
NewProjectPage.getLayout = (page) => (
  <DashboardLayout title={"Create New Project"}>{page}</DashboardLayout>
)

export default NewProjectPage
