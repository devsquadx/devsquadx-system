import { Box } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import MainContentHeading from "./MainContentHeading"

interface Props {
  children: ReactNode
}

const MainContent: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <MainContentHeading />
      <Box p="5">{children}</Box>
    </Box>
  )
}

export default MainContent
