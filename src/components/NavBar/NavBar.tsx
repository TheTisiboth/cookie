"use client"

import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { MouseEvent, useState } from "react"
import Avatar from "./Avatar"
import DesktopContent from "./DesktopContent"
import MobileContent from "./MobileContent"

export type Navigation = {
  name: string
  path: string
  requiredPermissions?: string[]
}

export const pages: Navigation[] = [
  { name: "Home", path: "/" },
  {
    name: "My recipes",
    path: "/my-recipes",
    requiredPermissions: ["recipe:create"],
  },
  { name: "Admin", path: "/admin", requiredPermissions: ["recipe:delete"] },
]

function NavBar() {
  const { user, isAuthenticated, isLoading, getPermissions } =
    useKindeBrowserClient()
  const { permissions } = getPermissions()

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DesktopContent
            anchorElNav={anchorElNav}
            handleOpenNavMenu={handleOpenNavMenu}
            permissions={permissions}
            handleCloseNavMenu={handleCloseNavMenu}
          />
          <MobileContent
            handleCloseNavMenu={handleCloseNavMenu}
            permissions={permissions}
          />

          <Avatar isAuthenticated={isAuthenticated} user={user} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
