"use client"

import { loreleiNeutral } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs"
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types"
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { FC, MouseEvent, useMemo, useState } from "react"
import { Navigation } from "./NavBar"

type AvatarProps = {
  isAuthenticated: boolean | null
  user: KindeUser | null
}

const Avatar: FC<AvatarProps> = ({ isAuthenticated, user }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const LoggedInsettings: Navigation[] = [
    { name: "Profile", path: "/profile" },
    // { label: "Logout", fn: async () => await signOut(), href: "" },
  ]
  const avatar = useMemo(() => {
    return createAvatar(loreleiNeutral, {
      seed: new Date().toISOString(),
      radius: 50,
    }).toDataUriSync()
  }, [])

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      {isAuthenticated && (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user && user.picture ? (
                <Image
                  src={user.picture}
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <Image src={avatar} alt="Avatar" width={40} height={40} />
              )}
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {LoggedInsettings.map((setting) => (
              <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                <Link href={setting.path}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </Link>
              </MenuItem>
            ))}

            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">
                <LogoutLink>Logout</LogoutLink>
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  )
}

export default Avatar
