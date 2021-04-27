import { Box, Icon, theme, Tooltip } from "@chakra-ui/react"
import { Link, useRouter } from "blitz"
import React, { useState } from "react"
import { AiOutlineDollarCircle } from "react-icons/ai"
import { BsFiles } from "react-icons/bs"
import { FiSettings, FiTrello, FiUsers } from "react-icons/fi"
import LogoutIcon from "./LogoutIcon"

const IconLink = ({ icon, name, isActive }) => {
  const [color, setColor] = useState(theme.colors.gray["400"])

  return (
    <Icon
      onMouseOver={() => setColor(theme.colors.gray["50"])}
      onMouseLeave={() => setColor(theme.colors.gray["400"])}
      boxSize="6"
      color={isActive ? theme.colors.gray["800"] : color}
      as={icon}
    />
  )
}

interface Props {}

export const links = [
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
    subLinks: [],
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
    name: "Money",
    icon: AiOutlineDollarCircle,
    link: "/income",
    subLinks: [],
  },
  {
    name: "Settings",
    icon: FiSettings,
    link: "/settings",
    subLinks: [],
  },
]

const SideBarIcons: React.FC<Props> = () => {
  const router = useRouter()
  const path = `/${router.pathname.split("/")[1]}`

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      flex="1"
    >
      <Box>
        {links.map((l, index) => (
          <Link href={l.link} key={index}>
            <a>
              <Tooltip hasArrow placement="right" label={l.name}>
                <Box p="5" bg={path === l.link ? "white" : "gray.800"}>
                  <IconLink key={index} icon={l.icon} name={l.name} isActive={path === l.link} />
                </Box>
              </Tooltip>
            </a>
          </Link>
        ))}
      </Box>
      <LogoutIcon />
    </Box>
  )
}

export default SideBarIcons
