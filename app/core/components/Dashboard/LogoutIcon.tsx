import { Icon, theme } from "@chakra-ui/react"
import logout from "app/auth/mutations/logout"
import { showLogoutAtom } from "app/core/store"
import { Routes, useMutation, useRouter } from "blitz"
import { useAnimation } from "framer-motion"
import { useAtom } from "jotai"
import React, { useEffect } from "react"
import { FiLogOut } from "react-icons/fi"
import MotionBox from "../MotionBox"

interface Props {}

const LogoutIcon: React.FC<Props> = () => {
  const [showLogout, setShowLogout] = useAtom(showLogoutAtom)
  const controls = useAnimation()
  const router = useRouter()
  const [logoutMutation, { isLoading }] = useMutation(logout)

  const handleLogout = async () => {
    try {
      await logoutMutation()
      setShowLogout(false)
    } catch (err) {
      console.log(err)
      setShowLogout(false)
      router.push(Routes.LoginPage())
    }
  }

  useEffect(() => {
    if (showLogout) {
      controls.start((i) => ({
        opacity: 1,
        x: 0,
      }))
    } else {
      controls.start((i) => ({
        opacity: 0,
        x: -50,
      }))
    }
  }, [showLogout])

  return (
    <MotionBox
      justifySelf="flex-end"
      p="5"
      initial={{ opacity: 0 }}
      animate={controls}
      _hover={{ cursor: "pointer" }}
      onClick={handleLogout}
    >
      <Icon
        boxSize={6}
        as={FiLogOut}
        color={theme.colors.gray["400"]}
        _hover={{ color: "red.500" }}
      />
    </MotionBox>
  )
}

export default LogoutIcon
