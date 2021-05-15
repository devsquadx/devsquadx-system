import { Box, Icon, theme, Tooltip } from "@chakra-ui/react"
import { sidebarLinks } from "app/core/layouts/DashboardLayout"
import { Link, useRouter } from "blitz"
import React, { useState } from "react"
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
        {sidebarLinks.map((l, index) => (
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
