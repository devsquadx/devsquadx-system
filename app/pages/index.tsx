import { Box, Button } from "@chakra-ui/react"
import logout from "app/auth/mutations/logout"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import { BlitzPage, getSession, Routes, useMutation, useRouter } from "blitz"
import React from "react"

const Home: BlitzPage = () => {
  const router = useRouter()
  const [logoutMutation, { isLoading }] = useMutation(logout)

  const handleLogout = async () => {
    try {
      await logoutMutation()
    } catch (err) {
      console.log(err)
      router.push(Routes.LoginPage())
    }
  }

  return (
    <Box>
      <Box>Hello world</Box>
      <Button colorScheme="red" onClick={handleLogout} isLoading={isLoading}>
        Logout
      </Button>
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
