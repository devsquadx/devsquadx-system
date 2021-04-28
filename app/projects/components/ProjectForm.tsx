import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import SliderSelectField from "app/core/components/SliderSelectField"
import { Customer } from "db"
import React from "react"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function ProjectForm<S extends z.ZodType<any, any>>(
  props: FormProps<S> & {
    customers: Customer[]
  }
) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Project Name" placeholder="Project Name" />
      <SliderSelectField
        name="customerId"
        label="Customer"
        placeholder="Select Customer"
        options={props.customers.map((c) => ({ label: c.name, value: c.id }))}
      />
      {/* <LabeledSelectField
        name="customerId"
        label="Customer"
        options={props.customers.map((customer) => ({ label: customer.name, value: customer.id }))}
        placeholder="Select Customer"
      /> */}
    </Form>
  )
}
