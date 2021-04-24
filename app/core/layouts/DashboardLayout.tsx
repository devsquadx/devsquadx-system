import { Box } from "@chakra-ui/react"
import { Head } from "blitz"
import React, { ReactNode } from "react"
import LeftSideBar from "../components/Dashboard/LeftSideBar"
import MainContent from "../components/Dashboard/MainContent"
import MiddleSideBar from "../components/Dashboard/MiddleSideBar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const DashboardLayout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "devsquadx-system"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box display="flex" w="100%" h="100%">
        <Box display="flex">
          <LeftSideBar />
          <MiddleSideBar />
        </Box>
        <Box flex="3">
          <MainContent>{children}</MainContent>
        </Box>
      </Box>
    </>
  )
}

export default DashboardLayout
