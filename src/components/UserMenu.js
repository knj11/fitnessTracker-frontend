import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { clearCurrentUser } from '../auth'

export default function UserMenu({ user, toggleSignUpForm, setUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    setAnchorEl(null)
    clearCurrentUser()
    setUser(false)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = () => {
    setAnchorEl(null)
    toggleSignUpForm(true)
  }

  return (
    <div>
      <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {user ? user : 'LOGIN'}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user
          ? <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
          :
          <>
            <MenuItem onClick={handleClose}>Create New Account</MenuItem>
            <MenuItem onClick={handleSignIn}>Sign In</MenuItem>
          </>
        }
      </Menu>
    </div>
  );
}