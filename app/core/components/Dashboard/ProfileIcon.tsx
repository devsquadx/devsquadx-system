import { Box, Icon } from "@chakra-ui/react"
import theme from "@chakra-ui/theme"
import { showLogoutAtom } from "app/core/store"
import { useAtom } from "jotai"
import React, { useState } from "react"
import { FaRegUserCircle } from "react-icons/fa"

interface Props {}

const ProfileIcon: React.FC<Props> = () => {
  const [color, setColor] = useState(theme.colors.gray["400"])
  const [, setShowLogout] = useAtom(showLogoutAtom)

  return (
    <Box
      borderTop="2px"
      borderColor="gray.500"
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="80%"
      onMouseOver={() => {
        setShowLogout(true)
        setColor(theme.colors.gray["50"])
      }}
      onMouseLeave={() => setColor(theme.colors.gray["400"])}
      _hover={{
        cursor: "pointer",
      }}
    >
      <Icon my="5" boxSize="6" as={FaRegUserCircle} color={color} />
    </Box>
  )
}

export default ProfileIcon
