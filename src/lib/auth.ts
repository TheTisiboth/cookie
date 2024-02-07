import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

export const checkUserLoggedIn = async () => {
  const { isAuthenticated } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()
  if (!isLoggedIn) redirect("/api/auth/login")
}

export const checkUserIsAuthorized = async () => {
  await checkUserLoggedIn()
  const { getPermission, getAccessToken } = getKindeServerSession()
  const token = await getAccessToken()
  const requiredPermission = await getPermission("recipe:delete")
  if (!requiredPermission?.isGranted) redirect("/")
}
