import { Box, Icon, theme } from "@chakra-ui/react"
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

const links = [
  {
    name: "dashboard",
    icon: FiTrello,
    link: "/",
  },
  {
    name: "projects",
    icon: BsFiles,
    link: "/projects",
  },
  {
    name: "customers",
    icon: FiUsers,
    link: "/customers",
  },
  {
    name: "money",
    icon: AiOutlineDollarCircle,
    link: "/income",
  },
  {
    name: "settings",
    icon: FiSettings,
    link: "/settings",
  },
]

const SideBarIcons: React.FC<Props> = () => {
  const router = useRouter()

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
              <Box p="5" bg={router.pathname === l.link ? "white" : "gray.800"}>
                <IconLink
                  key={index}
                  icon={l.icon}
                  name={l.name}
                  isActive={router.pathname === l.link}
                />
              </Box>
            </a>
          </Link>
        ))}
      </Box>
      <LogoutIcon />
    </Box>
  )
}

export default SideBarIcons
