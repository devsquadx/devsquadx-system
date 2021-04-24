import { Box } from "@chakra-ui/react"
import React from "react"

interface Props {}

const MiddleSideBar: React.FC<Props> = () => {
  return (
    <Box w="220px" h="100%">
      <Box>Middle Side Bar</Box>
    </Box>
  )
}

export default MiddleSideBar
