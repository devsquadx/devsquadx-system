import { Box, Heading } from "@chakra-ui/react"
import React from "react"

interface Props {}

const CompanyName: React.FC<Props> = () => {
  return (
    <Box h="64px" bg="gray.200" display="flex" alignItems="center" justifyContent="center">
      <Heading fontFamily="Poppins" fontSize="2xl" color="gray.700">
        Dev Squad X
      </Heading>
    </Box>
  )
}

export default CompanyName
