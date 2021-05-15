import { Box, Slide, useMediaQuery, useOutsideClick } from "@chakra-ui/react"
import { Head } from "blitz"
import { useAtom } from "jotai"
import React, { ReactNode, useEffect, useRef } from "react"
import { AiOutlineDollarCircle } from "react-icons/ai"
import { BsFiles } from "react-icons/bs"
import { FiSettings, FiTrello, FiUsers } from "react-icons/fi"
import LeftSideBar from "../components/Dashboard/LeftSideBar"
import MainContent from "../components/Dashboard/MainContent"
import MiddleSideBar from "../components/Dashboard/MiddleSideBar"
import { showSidebarAtom } from "../store"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const DashboardLayout = ({ title, children }: LayoutProps) => {
  const [isOpen, setOpen] = useAtom(showSidebarAtom)
  const [isMobile] = useMediaQuery("(max-width: 48em)")
  const ref = useRef<HTMLElement>(null)
  useOutsideClick({
    ref: ref,
    handler: (e) => {
      if (isMobile && isOpen) {
        setOpen(false)
      }
    },
  })

  useEffect(() => {
    if (window) {
      if (isMobile) {
        setOpen(false)
      } else {
        setOpen(true)
      }
    }
  }, [isMobile])

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
        <Box
          sx={{
            zIndex: 10,
            width: "284px",
            position: "relative",
            "@media (max-width: 48em)": {
              position: "absolute",
            },
          }}
        >
          <Slide
            in={isOpen}
            direction="left"
            //@ts-ignore
            ref={ref}
            style={{ width: "284px" }}
          >
            <Box display="flex" h="100%" w="284px" p="0">
              <LeftSideBar />
              <MiddleSideBar />
            </Box>
          </Slide>
        </Box>
        <Box flex="3">
          <MainContent title={title}>{children}</MainContent>
        </Box>

        {/* {!isMobile && <RightSideBar />} */}
      </Box>
    </>
  )
}

export default DashboardLayout

export const sidebarLinks = [
  {
    name: "Dashboard",
    icon: FiTrello,
    link: "/",
    subLinks: [],
  },
  {
    name: "Projects",
    icon: BsFiles,
    link: "/projects",
    subLinks: [
      {
        name: "View Projects",
        link: "/projects",
      },
      {
        name: "Add New Project",
        link: "/projects/new",
      },
    ],
  },
  {
    name: "Customers",
    icon: FiUsers,
    link: "/customers",
    subLinks: [
      {
        name: "View Customers",
        link: "/customers",
      },
      {
        name: "Add New Customer",
        link: "/customers/new",
      },
    ],
  },
  {
    name: "Finance",
    icon: AiOutlineDollarCircle,
    link: "/finance",
    subLinks: [
      {
        name: "Incomes",
        link: "/finance/incomes",
      },
      {
        name: "Expenses",
        link: "/finance/expenses",
      },
      {
        name: "Income Types",
        link: "/finance/incometypes",
      },
      {
        name: "Expense Types",
        link: "/finance/expensetypes",
      },
      // {
      //   name: "Add Income Type",
      //   link: "/finance/incometypes/new",
      // },
      // {
      //   name: "Add Expense Type",
      //   link: "/finance/expensetypes/new",
      // },
    ],
  },
  {
    name: "Settings",
    icon: FiSettings,
    link: "/settings",
    subLinks: [],
  },
]
