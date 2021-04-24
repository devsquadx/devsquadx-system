import { Box } from "@chakra-ui/react"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import { BlitzPage, getSession } from "blitz"
import React from "react"

const Home: BlitzPage = () => {
  return (
    <Box h="100%">
      <Box>Main Content</Box>
    </Box>
  )
}

Home.suppressFirstRenderFlicker = false
Home.getLayout = (page) => <DashboardLayout title="Home">{page}</DashboardLayout>

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (!session.userId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return { props: {} }
}

export default Home
