import { Box } from "@chakra-ui/react"
import { showLogoutAtom } from "app/core/store"
import { useAtom } from "jotai"
import React from "react"
import Logo from "./Logo"
import ProfileIcon from "./ProfileIcon"
import SideBarIcons from "./SideBarIcons"

interface Props {}

const LeftSideBar: React.FC<Props> = () => {
  const [, setShowLogout] = useAtom(showLogoutAtom)

  return (
    <Box
      w="64px"
      display="flex"
      bg="gray.800"
      flexDirection="column"
      alignItems="center"
      onMouseLeave={() => setShowLogout(false)}
    >
      <Logo />
      <SideBarIcons />
      <ProfileIcon />
    </Box>
  )
}

export default LeftSideBar
