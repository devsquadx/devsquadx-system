import { Box, Input, Text } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import { useField, useForm } from "react-final-form"
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
        <Input
          value={title}
          placeholder={props.placeholder}
          disabled={submitting}
          onClick={() => setOpen(true)}
          readOnly
        />
        <Input {...input} disabled={submitting} name={name} {...props} hidden />
      </label>

      {touched && normalizedError && (
        <Box role="alert" color="red.600" textAlign="left" pt="1">
          {normalizedError}
        </Box>
      )}

      {isOpen && (
        <SideDrawer isOpen={isOpen} setOpen={setOpen}>
          {options.map((opt) => (
            <Box
              key={opt.value}
              py="2"
              px="5"
              my="1"
              bg="gray.100"
              _hover={{
                bg: "gray.200",
                cursor: "pointer",
              }}
              onClick={() => clickItem(opt.label, opt.value)}
            >
              <Text>{opt.label}</Text>
            </Box>
          ))}
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
