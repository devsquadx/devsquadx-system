import { Box } from "@chakra-ui/react"
import { forwardRef } from "react"
import { useField } from "react-final-form"
import Select from "react-select"

export interface Props {
  name: string
  label: string
  isMulti?: boolean
  [x: string]: any
}

export const LabeledSelectField = forwardRef<HTMLSelectElement, Props>(
  ({ name, label, options, isMulti, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name)

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    const getValue = () => {
      if (options) {
        if (isMulti) {
          const values = options.filter((option) => input.value.indexOf(option.value) >= 0)
          return values
        } else {
          console.log({ value: input.value })
          const value = options.find((option) => option.value === input.value)
          return value ? value : ""
        }
        // return isMulti
        //   ? options.filter(option => field.value.indexOf(option.value) >= 0)
        //   : options.find(option => option.value === field.value);
      } else {
        return isMulti ? [] : ("" as any)
      }
    }

    return (
      <div>
        <label>
          {label}
          {/* @ts-ignore */}
          <Select
            {...input}
            disabled={submitting}
            options={options}
            {...props}
            ref={ref}
            value={getValue()}
            styles={{
              // input: () => ({ padding: 10 }),
              container: () => ({
                marginTop: 10,
                marginBottom: 10,
                position: "relative",
                width: "100%",
              }),
              menu: () => ({
                zIndex: 10,
              }),
            }}
          />
        </label>

        {touched && normalizedError && (
          <Box role="alert" color="red.600" textAlign="left" pt="1">
            {normalizedError}
          </Box>
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
)

export default LabeledSelectField
