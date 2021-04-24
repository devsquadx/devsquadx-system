import { Box } from "@chakra-ui/react"
import React, { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const MainContent: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <Box>{children}</Box>
    </Box>
  )
}

export default MainContent
