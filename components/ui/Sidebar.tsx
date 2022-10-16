import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AllInboxOutlinedIcon from '@mui/icons-material/AllInboxOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';

export const Sidebar = () => {
  return (
    <Drawer
        anchor="left"
        open={true}
        onClose={() => console.log('Cerrando Sidebar')}
    >
        <Box sx={{ width: 250, padding: 2 }}>
          <Box sx={{ padding: '5px 10px' }}>
            <Typography variant="h5">Menú</Typography>
          </Box>
          <List>
              <ListItem button key={1}>
                <ListItemIcon>
                  <InboxOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Menú 1" />
              </ListItem>

              <ListItem button key={2}>
                <ListItemIcon>
                  <MailOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Menú 2" />
              </ListItem>
          </List>
          <Divider />

          <List>
              <ListItem button key={3}>
                <ListItemIcon>
                  <AllInboxOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Menú 3" />
              </ListItem>

              <ListItem button key={4}>
                <ListItemIcon>
                  <ArchiveOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Menú 4" />
              </ListItem>
          </List>
        </Box>
    </Drawer>
  )
}
