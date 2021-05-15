import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import SliderSelectField from "app/core/components/SliderSelectField"
import { NewIncomeType } from "app/pages/finance/incometypes/new"
import { IncomeType } from "db"
import React from "react"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function IncomeForm<S extends z.ZodType<any, any>>(
  props: FormProps<S> & {
    incomeTypes: IncomeType[]
  }
) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="description" label="Income Name" placeholder="Income Description" />
      <LabeledTextField name="amount" label="Amount" placeholder="Enter the Amount" type="number" />
      <SliderSelectField
        name="incomeTypeId"
        label="IncomeType"
        placeholder="Select Income Type"
        options={props.incomeTypes.map((c) => ({ label: c.type, value: c.id }))}
        FormComponent={NewIncomeType}
      />
      {/* <LabeledSelectField
        name="incomeTypeId"
        label="IncomeType"
        options={props.incomeTypes.map((incomeType) => ({ label: incomeType.name, value: incomeType.id }))}
        placeholder="Select IncomeType"
      /> */}
    </Form>
  )
}
