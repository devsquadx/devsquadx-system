import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import LoginForm from "app/auth/components/LoginForm"
import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorComponent,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  useRouter,
} from "blitz"
import { ErrorBoundary } from "react-error-boundary"

const theme = extendTheme({
  styles: {
    global: {
      "html, body, #__next": {
        height: "100%",
      },
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        resetKeys={[router.asPath]}
        onReset={useQueryErrorResetBoundary().reset}
      >
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </ChakraProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
