import React, { useState, useEffect } from 'react'
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme, Avatar } from '@mui/material'
import { SettingsOutlined, ChevronLeft, ChevronRightOutlined, HomeOutlined, ShoppingCartOutlined, Groups2Outlined, ReceiptLongOutlined, PublicOutlined, PointOfSaleOutlined, TodayOutlined, CalendarMonthOutlined, AdminPanelSettingsOutlined } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'
import profileImg from '../assets/profileImg.jpg'
import logoIcon from '../assets/logo.png';

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Client Facing",
        icon: null
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />
    },
    {
        text: "Geography",
        icon: <PublicOutlined />
    },
    {
        text: "Sales",
        icon: null
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />
    },
    {
        text: "Daily",
        icon: <TodayOutlined />
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />
    },
    // {
    //     text: "Breakdown",
    //     icon: <PieChartOutlined />
    // },
    {
        text: "Management",
        icon: null
    },
    {
        text: "Admins",
        icon: <AdminPanelSettingsOutlined />
    },
    // {
    //     text: "Performance",
    //     icon: <TrendingUpOutlined />
    // },
]

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname])

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} variant='persistent' anchor='left' sx={{
                    width: drawerWidth,
                    "& .MuiDrawer-paper": {
                        color: theme.palette.secondary[200],
                        backgroundColor: theme.palette.background.alt,
                        boxSizing: "border-box",
                        borderWidth: isNonMobile ? 0 : "2px",
                        width: drawerWidth,
                        transition: '.2s ease-in-out'
                    }
                }}>
                    <Box width="100%">
                        <Box m="1.25rem 0px 1rem 1rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                {/* <Box display="flex" alignItems="center" gap=".5rem">
                                    <Typography variant='h4' fontWeight='bold' color={theme.palette.secondary[100]}>
                                        ERP
                                    </Typography>
                                </Box> */}
                                <Box sx={{display: "flex", justifyContent: 'space-around', gap: ".5rem", alignItems: "center"}}>
                                    <Avatar alt="" src={logoIcon} style={{ height: '30px', width: '30px' }} />
                                    <Typography variant='h4' fontWeight='bold' color={theme.palette.secondary[100]}>Dashboard Pro</Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {
                                navItems.map(({ text, icon }) => {
                                    if (!icon) {
                                        return (
                                            <Typography key={text} sx={{ m: "1.25rem 0px 1rem 1rem" }}>{text}</Typography>
                                        )
                                    }
                                    const lcText = text.toLocaleLowerCase();
                                    return (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton onClick={() => {
                                                navigate(`/${lcText}`);
                                                setActive(lcText);
                                            }}

                                                sx={{
                                                    backgroundColor: active === lcText ? theme.palette.secondary[300] : 'transparent',
                                                    color: active === lcText ? theme.palette.background.alt : theme.palette.secondary[600],
                                                    fontWeight: active === lcText ? 700 : 100
                                                }}

                                            >
                                                <ListItemIcon sx={{
                                                    color: active === lcText ? theme.palette.background.alt : theme.palette.secondary[600]
                                                }}>
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text}>
                                                    {active === lcText && (
                                                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                                                    )}
                                                </ListItemText>
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Box>

                    <Box position="sticky" bottom="0rem" backgroundColor={theme.palette.background.default} zIndex={999} paddingBottom="0.5em">
                        <Divider />
                        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 1rem 0 1rem">
                            <Box component="img" alt='profile' src={profileImg} height="40px" width="40px" borderRadius="50%" sx={{ objectFit: "cover" }} />
                            <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize=".9rem" sx={{ color: theme.palette.secondary[100] }}>
                                    {user.name}
                                </Typography>
                                <Typography fontSize=".7rem" sx={{ color: theme.palette.secondary[200] }}>
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <SettingsOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px" }} />
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export default Sidebar