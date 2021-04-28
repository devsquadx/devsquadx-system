import {
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
}

const SideDrawer: React.FC<Props> = React.memo(({ isOpen, setOpen, children }) => {
  console.log("in drawer")
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={() => setOpen(false)}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Select Item</DrawerHeader>

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
    </>
  )
})

export default SideDrawer
