import MenuIcon from "@mui/icons-material/Menu"
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import Link from "next/link"
import { FC, MouseEvent } from "react"
import { pages } from "./NavBar"
import Logo from "./Logo"

type DesktopContentProps = {
  anchorElNav: HTMLElement | null
  handleOpenNavMenu: (event: MouseEvent<HTMLElement>) => void
  handleCloseNavMenu: () => void
  permissions: string[]
}

const DesktopContent: FC<DesktopContentProps> = ({
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
  permissions,
}) => {
  return (
    <>
      <Logo />

      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map(({ name, path, requiredPermissions }) => {
            if (
              !requiredPermissions ||
              requiredPermissions.every((p) => permissions?.includes(p))
            ) {
              return (
                <MenuItem key={path} onClick={handleCloseNavMenu}>
                  <Link href={path}>
                    <Typography textAlign="center">{name}</Typography>
                  </Link>
                </MenuItem>
              )
            }
          })}
        </Menu>
      </Box>
    </>
  )
}

export default DesktopContent
