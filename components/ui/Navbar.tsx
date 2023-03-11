import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import CustomizedSwitches from "./Switch";


export const Navbar = () => {

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }} >
        <NextLink href='/' passHref legacyBehavior>
          <Link underline="none" color='white' sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarMonthTwoToneIcon sx={{ marginRight: 1 }} />
            <Typography variant="h6">
              TodoApp
            </Typography>
          </Link>
        </NextLink>
        <CustomizedSwitches />
      </Toolbar>
    </AppBar>
  )
}
