import { Box } from "@mui/material"
import Link from "next/link"
import { FC } from "react"
import Logo from "./Logo"
import { pages } from "./NavBar"

type MobileContentProps = {
  handleCloseNavMenu: () => void
  permissions: string[]
}

const MobileContent: FC<MobileContentProps> = ({
  handleCloseNavMenu,
  permissions,
}) => {
  return (
    <>
      <Logo isMobile />
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map(({ path, name, requiredPermissions }) => {
          if (
            !requiredPermissions ||
            requiredPermissions.every((p) => permissions?.includes(p))
          ) {
            return (
              <Link
                className="my-2 color-white display-block"
                key={path}
                href={path!}
                onClick={handleCloseNavMenu}
              >
                {name}
              </Link>
            )
          }
        })}
      </Box>
    </>
  )
}

export default MobileContent
