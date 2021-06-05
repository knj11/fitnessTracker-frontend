import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu({ user, toggleSignUpForm }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

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
          ? <MenuItem onClick={handleClose}>Log Out</MenuItem>
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