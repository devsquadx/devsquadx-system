import { Box } from "@chakra-ui/react"
import Dashboard from "app/core/components/Dashboard"
import Layout from "app/core/layouts/Layout"
import { BlitzPage } from "blitz"
import React, { Suspense } from "react"

const Home: BlitzPage = () => {
  return (
    <Box h="100vh">
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    </Box>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
