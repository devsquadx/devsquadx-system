import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import SliderSelectField from "app/core/components/SliderSelectField"
import { NewExpenseType } from "app/pages/finance/expensetypes/new"
import { ExpenseType } from "db"
import React from "react"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function ExpenseForm<S extends z.ZodType<any, any>>(
  props: FormProps<S> & {
    expenseTypes: ExpenseType[]
  }
) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="description" label="Expense Name" placeholder="Expense Description" />
      <LabeledTextField name="amount" label="Amount" placeholder="Enter the Amount" type="number" />
      <SliderSelectField
        name="expenseTypeId"
        label="ExpenseType"
        placeholder="Select Expense Type"
        options={props.expenseTypes.map((c) => ({ label: c.type, value: c.id }))}
        FormComponent={NewExpenseType}
      />
      {/* <LabeledSelectField
        name="expenseTypeId"
        label="ExpenseType"
        options={props.expenseTypes.map((expenseType) => ({ label: expenseType.name, value: expenseType.id }))}
        placeholder="Select ExpenseType"
      /> */}
    </Form>
  )
}
