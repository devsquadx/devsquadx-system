import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react"
import { NewCustomer } from "app/customers/pages/customers/new"
import React, { Suspense, useCallback, useEffect, useState } from "react"
import { useField, useForm } from "react-final-form"
import { FiArrowDown } from "react-icons/fi"
import SideDrawer from "./SideDrawer"

export interface Props {
  name: string
  label: string
  options: {
    label: string
    value: number
  }[]
  [x: string]: any
}

export const SliderSelectField: React.FC<Props> = ({ name, label, options, ...props }) => {
  const {
    input,
    meta: { touched, error, submitError, submitting },
  } = useField(name)
  const { mutators } = useForm()
  const [isOpen, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [addMode, setAddMode] = useState(false)

  const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

  const clickItem = useCallback((label, value) => {
    mutators.setValue(name, value)
    setTitle(label)
    setOpen(false)
  }, [])

  useEffect(() => {
    for (const o of options) {
      if (o.value === input.value) {
        setTitle(o.label)
        break
      }
    }
  }, [])

  console.log("in here")

  return (
    <div>
      <label>
        {label}
        <InputGroup>
          <InputLeftElement>
            <Icon boxSize="6" as={FiArrowDown} color="green.500" />
          </InputLeftElement>
          <Input
            size="lg"
            value={title}
            placeholder={props.placeholder}
            disabled={submitting}
            onClick={() => setOpen(true)}
            readOnly
          />
          <InputRightElement>
            <Button size="sm" colorScheme="yellow" mr="3" onClick={() => setAddMode(true)}>
              +
            </Button>
          </InputRightElement>
        </InputGroup>
        <Input {...input} disabled={submitting} name={name} {...props} hidden />
      </label>

      {touched && normalizedError && (
        <Box role="alert" color="red.600" textAlign="left" pt="1">
          {normalizedError}
        </Box>
      )}

      {isOpen && (
        <SideDrawer isOpen={isOpen} setOpen={setOpen} title="Select an Item">
          {options.map((opt) => (
            <Box
              key={opt.value}
              py="2"
              px="5"
              my="1"
              bg="gray.100"
              transition="ease-in 0.3s"
              _hover={{
                bg: "gray.200",
                cursor: "pointer",
                transform: "scale(1.01) rotate(-1deg)",
                my: 2,
              }}
              onClick={() => clickItem(opt.label, opt.value)}
            >
              <Text fontFamily="Poppins">{opt.label}</Text>
            </Box>
          ))}
        </SideDrawer>
      )}

      {addMode && (
        <SideDrawer isOpen={addMode} setOpen={setAddMode} title={`Add ${label}`}>
          <Suspense fallback={<div>Loading...</div>}>
            <NewCustomer returnFunc={setAddMode} />
          </Suspense>
        </SideDrawer>
      )}

      <style jsx>{`
        label {
          display: flex;
          flex-direction: column;
          align-items: start;
          font-size: 1rem;
        }
      `}</style>
    </div>
  )
}

export default SliderSelectField
