import { checkUserIsAuthorized } from "@/lib/auth"

export default async function Admin() {
  await checkUserIsAuthorized()

  return <h1>Admin page</h1>
}
