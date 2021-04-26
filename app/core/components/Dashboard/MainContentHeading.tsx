import { useRouter } from "@blitzjs/core"
import { Box, Heading, Icon } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { links } from "./SideBarIcons"

interface Props {}

const MainContentHeading: React.FC<Props> = () => {
  const [heading, setHeading] = useState("")
  // const [icon, setIcon] = useState();
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    links.forEach((l) => {
      if (router.pathname === l.link) {
        setHeading(l.name)
        setLoading(false)
      }
    })
  }, [])

  if (loading) return <div>...</div>

  return (
    <Box py="3" px="8" pt="10" display="flex" alignItems="center" pl="10" boxShadow="lg">
      <Box bg="gray.100" p="2" borderRadius="full">
        <Icon
          as={(links.find((l) => l.name === (heading as string)) as any).icon}
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
        {heading}
      </Heading>
    </Box>
  )
}

export default MainContentHeading
