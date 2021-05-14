import DashboardLayout from "app/core/layouts/DashboardLayout"
import { BlitzPage } from "blitz"
import React from "react"

const FinancePage: BlitzPage = () => {
  return (
    <>
      <div></div>
    </>
  )
}

FinancePage.authenticate = true
FinancePage.getLayout = (page) => <DashboardLayout title="Finance">{page}</DashboardLayout>

export default FinancePage
