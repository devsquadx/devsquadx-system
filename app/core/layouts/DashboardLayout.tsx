import { Box } from "@chakra-ui/react"
import { Head } from "blitz"
import React, { ReactNode } from "react"
import LeftSideBar from "../components/Dashboard/LeftSideBar"
import MainContent from "../components/Dashboard/MainContent"
import MiddleSideBar from "../components/Dashboard/MiddleSideBar"
import RightSideBar from "../components/Dashboard/RightSideBar"

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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700;900&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <Box display="flex" w="100%" h="100%">
        <Box display="flex">
          <LeftSideBar />
          <MiddleSideBar />
        </Box>
        <Box flex="3">
          <MainContent title={title}>{children}</MainContent>
        </Box>
        <RightSideBar />
      </Box>
    </>
  )
}

export default DashboardLayout
