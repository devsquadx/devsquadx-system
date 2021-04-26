import { Box } from "@chakra-ui/react"
import React from "react"
import CompanyName from "./CompanyName"

interface Props {}

const MiddleSideBar: React.FC<Props> = () => {
  return (
    <Box w="220px" h="100%" bg="gray.100" display="flex" flexDir="column">
      <CompanyName />
      <Box flex="1"></Box>
    </Box>
  )
}

export default MiddleSideBar
