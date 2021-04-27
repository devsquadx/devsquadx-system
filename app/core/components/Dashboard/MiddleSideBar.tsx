import { useRouter } from "@blitzjs/core"
import { Box, chakra } from "@chakra-ui/react"
import { Link } from "blitz"
import React, { useEffect, useState } from "react"
import CompanyName from "./CompanyName"
import { links } from "./SideBarIcons"

interface Props {}

const MiddleSideBar: React.FC<Props> = () => {
  const router = useRouter()
  const [subLinks, setSubLinks] = useState<any>([])

  useEffect(() => {
    const path = `/${router.pathname.split("/")[1]}`
    links.forEach((l) => {
      if (path === l.link) {
        setSubLinks(l.subLinks)
      }
    })
  }, [router.asPath])

  return (
    <Box w="220px" h="100%" bg="gray.100" display="flex" flexDir="column">
      <CompanyName />
      <Box flex="1" display="flex" flexDir="column">
        <br />
        {subLinks.map((sl, index: number) => (
          <Link href={sl.link}>
            <chakra.a
              boxShadow="md"
              cursor="pointer"
              py="3"
              my="1"
              px="3"
              fontFamily="Poppins"
              bg="gray.300"
              textAlign="left"
              mx="2"
              transition="ease-in 0.2s"
              _hover={{
                transform: "scale(1.03)",
              }}
            >
              {sl.name}
            </chakra.a>
          </Link>
        ))}
      </Box>
    </Box>
  )
}

export default MiddleSideBar
