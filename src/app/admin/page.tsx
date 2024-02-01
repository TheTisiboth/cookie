import { checkUserIsAuthorized } from "@/lib/auth"

export default async function Admin() {
  await checkUserIsAuthorized()

  return <>Admin page</>
}
