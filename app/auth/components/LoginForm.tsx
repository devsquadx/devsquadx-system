import { Box, chakra, Heading } from "@chakra-ui/react"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { AuthenticationError, Link, Routes, useMutation } from "blitz"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      bg="gray.100"
      fontFamily="Poppins"
    >
      <Box shadow="base" p="10" bg="gray.50">
        <Heading textAlign="center" textTransform="uppercase" fontFamily="Poppins">
          Login
        </Heading>

        <Form
          submitText="Login"
          schema={Login}
          initialValues={{ email: "silvasanoj@gmail.com", password: "1234567890" }}
          onSubmit={async (values) => {
            try {
              await loginMutation(values)
              props.onSuccess?.()
            } catch (error) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <Box textAlign="center">
            <Link href={Routes.ForgotPasswordPage()}>
              <chakra.a
                color="blue.600"
                _hover={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Forgot your password?
              </chakra.a>
            </Link>
          </Box>
        </Form>

        <Box textAlign="center" mt="3">
          Or{" "}
          <Link href={Routes.SignupPage()}>
            <chakra.a color="blue.600" _hover={{ cursor: "pointer", textDecoration: "underline" }}>
              Sign Up
            </chakra.a>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginForm
