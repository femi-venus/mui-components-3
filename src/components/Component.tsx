import {
  Avatar,
  AvatarGroup,
  Card,
  Checkbox,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { config } from "./config";
import { useState } from "react";

export default function AvatarCard() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleChange = (userId: number) => {
    setSelectedIds((prev: number[]) => {
      const selectedUserIds = prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId];

      const selectedUsers = config.users.filter((user) =>
        selectedUserIds.includes(user.id)
      );
      const selectedNames = selectedUsers.map((user) => user.label);

      console.log(selectedNames);

      return selectedUserIds;
    });
  };

  const displayMenu = config.users.slice(2);
  return (
    <>
      <Grid container spacing={2} p={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ p: 5, height: 100, width: 100 }}>
            <AvatarGroup
              max={3}
              sx={{ mt: 2 }}
              slotProps={{
                additionalAvatar: { onClick: handleOpen },
              }}
            >
              {config.users.map((user) => (
                <Avatar
                  key={user.id}
                  alt={user.label}
                  src={user.avatar}
                  onClick={() => handleChange(user.id)}
                ></Avatar>
              ))}
            </AvatarGroup>
          </Card>
        </Grid>
      </Grid>

      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        {displayMenu.map((user) => (
          <MenuItem key={user.id} onClick={() => handleChange(user.id)}>
            <Checkbox checked={selectedIds.includes(user.id)} />
            <Avatar src={user.avatar} />
            <Typography>{user.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
