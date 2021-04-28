import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react"
import React, { Dispatch, ReactNode, SetStateAction } from "react"

interface Props {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  title: string
}

const SideDrawer: React.FC<Props> = React.memo(({ isOpen, setOpen, title, children }) => {
  return (
    <Box>
      <Drawer isOpen={isOpen} placement="right" onClose={() => setOpen(false)} size={"lg"}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader fontFamily="Poppins">{title}</DrawerHeader>

            <DrawerBody>{children}</DrawerBody>

            {/* <DrawerFooter>
              <Button variant="outline" mr={3} onClose={() => setOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter> */}
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  )
})

export default SideDrawer
