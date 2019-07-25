import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, IconButton, Button, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

function NavBar()
{
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    <Link href="/" underline="none" color="inherit">
                        Produit
                    </Link>
                </Typography>
                <Button href="/add" color="inherit">Add</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;