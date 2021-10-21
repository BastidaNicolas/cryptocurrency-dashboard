import React, { Fragment, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import useWindowSize from './WindowSz';

// MaterialUI imports
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import makeStyles from '@mui/styles/makeStyles';
import AccountBalance from '@mui/icons-material/AccountBalance';
import Home from '@mui/icons-material/Home';
import MenuSharp from '@mui/icons-material/MenuSharp';
import MonetizationOn from '@mui/icons-material/MonetizationOn';
import NewReleases from '@mui/icons-material/NewReleases';
import Grain from '@mui/icons-material/Grain';

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
            minHeight: theme.mixins.toolbar.minHeight + 15,
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
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} elevation={1}>
                <Toolbar position="static">
                    <Grain fontSize='large' sx={{marginRight: 0.2}} onClick={() => history.push('/')}/>
                    <Typography variant='h5' component='h1' sx={{flexGrow: 1}}>
                        CryptoDash
                    </Typography>
                    {size.width < 813 &&
                        (
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => setOpen(!open)}
                            >
                                <MenuSharp />
                            </IconButton>
                        )
                    }
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
