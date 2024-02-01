import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import { Button } from "@mui/material"
export default async function Home() {
  return (
    <main>
      <h1>Home page</h1>
      <Button>
        <LoginLink>Sign in</LoginLink>
      </Button>
      <Button>
        <RegisterLink>Sign up</RegisterLink>
      </Button>
    </main>
  )
}
