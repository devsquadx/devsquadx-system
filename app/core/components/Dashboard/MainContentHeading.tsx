import { useRouter } from "@blitzjs/core"
import { Box, Heading, Icon, useMediaQuery } from "@chakra-ui/react"
import { sidebarLinks } from "app/core/layouts/DashboardLayout"
import { showSidebarAtom } from "app/core/store"
import { useAtom } from "jotai"
import React, { useEffect, useState } from "react"
import { BiMenuAltLeft } from "react-icons/bi"

interface Props {
  title?: string
}

const MainContentHeading: React.FC<Props> = ({ title }) => {
  const [heading, setHeading] = useState("")
  // const [icon, setIcon] = useState();
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isMobile] = useMediaQuery("(max-width: 48em)")
  const [, setOpen] = useAtom(showSidebarAtom)

  useEffect(() => {
    const path = `/${router.pathname.split("/")[1]}`
    sidebarLinks.forEach((l) => {
      if (path === l.link) {
        setHeading(l.name)
        setLoading(false)
      }
    })
  }, [router.asPath])

  if (loading) return <div></div>

  return (
    <Box py="3" px="8" pt="10" display="flex" alignItems="center" pl="10" boxShadow="lg">
      {isMobile && (
        <Box ml="-5" mr="2" px="3">
          <Icon
            as={BiMenuAltLeft}
            color="gray.800"
            boxSize="8"
            onClick={() => setOpen((prev) => !prev)}
          />
        </Box>
      )}
      <Box bg="gray.100" p="2" borderRadius="full">
        <Icon
          as={(sidebarLinks.find((l) => l.name === (heading as string)) as any).icon}
          color="gray.600"
          boxSize="8"
        />
      </Box>
      <Heading
        letterSpacing="0.05rem"
        fontSize="2xl"
        fontWeight="extrabold"
        fontFamily="Poppins"
        pl="3"
        color="gray.800"
      >
        {title}
      </Heading>
    </Box>
  )
}

export default MainContentHeading
