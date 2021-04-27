import { Box } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import MainContentHeading from "./MainContentHeading"

interface Props {
  children: ReactNode
  title?: string
}

const MainContent: React.FC<Props> = ({ children, title }) => {
  return (
    <Box>
      <MainContentHeading title={title} />
      <Box p="5">{children}</Box>
    </Box>
  )
}

export default MainContent
