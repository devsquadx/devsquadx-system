import { Box } from "@chakra-ui/layout"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import getCustomers from "app/customers/queries/getCustomers"
import { FORM_ERROR, ProjectForm } from "app/projects/components/ProjectForm"
import updateProject from "app/projects/mutations/updateProject"
import getProject from "app/projects/queries/getProject"
import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const EditProject = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const [project, { setQueryData }] = useQuery(getProject, { id: projectId })
  const [{ customers }] = useQuery(getCustomers, { orderBy: { id: "desc" } })
  const [updateProjectMutation] = useMutation(updateProject)

  return (
    <>
      <Box boxShadow="base" p="3">
        <ProjectForm
          submitText="Update Project"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateProject}
          mutators={{
            // expect (field, value) args from the mutator
            setValue: ([field, value], state, { changeValue }) => {
              changeValue(state, field, () => value)
            },
          }}
          customers={customers}
          initialValues={project}
          onSubmit={async (values) => {
            try {
              const updated = await updateProjectMutation({
                id: project.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowProjectPage({ projectId: updated.id }))
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

const EditProjectPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProject />
      </Suspense>
    </div>
  )
}

EditProjectPage.authenticate = true
EditProjectPage.getLayout = (page) => <DashboardLayout title="Edit Project">{page}</DashboardLayout>

export default EditProjectPage
