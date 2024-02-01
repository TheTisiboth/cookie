import AdbIcon from "@mui/icons-material/Adb"
import { Typography } from "@mui/material"
import Link from "next/link"
import { FC } from "react"

type LogoProps = { isMobile?: boolean }
const Logo: FC<LogoProps> = ({ isMobile }) => {
  const display = isMobile
    ? { xs: "flex", md: "none" }
    : { xs: "none", md: "flex" }
  return (
    <Link href="/">
      <AdbIcon sx={{ display, mr: 1 }} />
      <Typography
        variant={isMobile ? "h5" : "h6"}
        noWrap
        sx={{
          mr: 2,
          display,
          fontFamily: "monospace",
          flexgrow: isMobile ? 1 : 0,
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        LOGO
      </Typography>
    </Link>
  )
}

export default Logo
