import React, { Fragment, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, Button, List, ListItem, Icon, ListItemIcon, ListItemText, Container, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AccountBalance, Home, MenuSharp, MonetizationOn, NewReleases, Grain } from '@mui/icons-material';
import useWindowSize from './WindowSz';

const useStyles = makeStyles((theme) => {
    return {
        mobDrawerPaper: {
            marginTop: theme.mixins.toolbar.minHeight,
            width: '100%'
        },
        drawerPaper: {
            marginTop: theme.mixins.toolbar.minHeight
        },
        navbarHeight: {
            minHeight: theme.mixins.toolbar.minHeight + 25,
        },
        root: {
            display: 'flex'
        },
    }
})

const Navbar = ({ children }) => {

    const [open, setOpen] = useState(false);
    const size = useWindowSize();
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const drawerWidth = 250;

    const menuItems = [
        {
            text: 'Home',
            icon: <Home />,
            path: '/'
        },
        {
            text: 'Cryptocurrencies',
            icon: <MonetizationOn />,
            path: '/cryptocurrencies'
        },
        {
            text: 'Exchanges',
            icon: <AccountBalance />,
            path: '/exchanges'
        },
        {
            text: 'News',
            icon: <NewReleases />,
            path: '/news'
        },
    ]

    return (
        <Box className={classes.root}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar position="static">
                    {size.width < 813 &&
                        (
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 1 }}
                                onClick={() => setOpen(!open)}
                            >
                                <MenuSharp />
                            </IconButton>
                        )
                    }
                    <Grain fontSize='large' sx={{marginRight: 0.2}}/>
                    <Typography variant='h5' component='h1'>
                        CryptoDash
                    </Typography>
                </Toolbar>
            </AppBar>
            {size.width > 813 ?
                (
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant='permanent'
                        anchor='left'
                        classes={{ paper: classes.drawerPaper }}
                    >
                        {/* <Box className={classes.navbarHeight}></Box> */}
                        <List>
                            {menuItems.map((link) => (
                                <ListItem
                                    key={link.text}
                                    button
                                    onClick={() => history.push(link.path)}
                                    selected={link.path == location.pathname}
                                >
                                    <ListItemIcon>{link.icon}</ListItemIcon>
                                    <ListItemText primary={link.text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                )
                :
                (
                    <Fragment>
                        <Drawer
                            classes={{ paper: classes.mobDrawerPaper }}
                            anchor='left'
                            open={open}
                            onClose={() => setOpen(!open)}
                        >
                            <List>
                                {menuItems.map((link) => (
                                    <ListItem
                                        key={link.text}
                                        button
                                        onClick={() => {
                                            history.push(link.path)
                                            setOpen(!open)
                                        }}
                                        selected={link.path == location.pathname}
                                    >
                                        <ListItemIcon>{link.icon}</ListItemIcon>
                                        <ListItemText primary={link.text} />
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>
                    </Fragment>
                )
            }
            <Box width='100%'>
                <Box className={classes.navbarHeight}></Box>
                {size.width > 320 ?
                    (
                        <Container maxWidth='false'>
                            {children}
                        </Container>
                    )
                    :
                    children
                }
            </Box>
        </Box>
    )
}

export default Navbar
