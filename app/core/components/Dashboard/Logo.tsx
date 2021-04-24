import { Box, Icon } from "@chakra-ui/react"
import React from "react"
import { AiOutlinePlayCircle } from "react-icons/ai"

interface Props {}

const Logo: React.FC<Props> = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="green.300"
      h="64px"
      w="64px"
    >
      <Icon as={AiOutlinePlayCircle} boxSize="8" color="white" />
    </Box>
  )
}

export default Logo
