import { Box, Button } from "@chakra-ui/react"
import logout from "app/auth/mutations/logout"
import { Routes, useMutation, useRouter, useSession } from "blitz"
import React, { useEffect } from "react"

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const router = useRouter()
  const [logoutMutation, { isLoading }] = useMutation(logout)
  const session = useSession()

  const handleLogout = async () => {
    try {
      await logoutMutation()
    } catch (err) {
      console.log(err)
      router.push(Routes.LoginPage())
    }
  }

  useEffect(() => {
    if (!session.userId) {
      router.push(Routes.LoginPage())
    }
  }, [])

  return (
    <>
      <Box>Hello world</Box>
      <Button colorScheme="red" onClick={handleLogout} isLoading={isLoading}>
        Logout
      </Button>
    </>
  )
}

export default Dashboard
