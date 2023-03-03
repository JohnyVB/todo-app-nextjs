import { AppBar, Toolbar, Typography } from "@mui/material";

export const Navbar = () => {

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">TodoApp</Typography>
      </Toolbar>
    </AppBar>
  )
}
