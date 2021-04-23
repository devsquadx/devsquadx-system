import { Head } from "blitz"
import React, { ReactNode } from "react"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const DashboardLayout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "devsquadx-system"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  )
}

export default DashboardLayout
