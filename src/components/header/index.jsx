import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const pages = [
  { id: 1, title: 'Home', link: '/' },
  { id: 2, title: 'Terms & Conditions', link: '/terms' },
  { id: 2, title: 'Privacy Policy', link: '/privacy' },
  { id: 3, title: 'Security', link: '/security' },
  { id: 4, title: 'About Us', link: '/about-us' },
  { id: 5, title: 'Contact Us', link: '/contact' },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (link) => {
    if (link) navigate(link);
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#EBF3FF', boxShadow: 'none' }}>
      <Container maxWidth="xl" sx={{ pb: '0px' }}>
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'flex', md: 'none', lg: 'none' }, alignItems: 'center' }}>
            <Button
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ marginRight: 1, display: 'flex', alignItems: 'center', justifyContent: 'left' }}
            >
              <img src="/assets/menu-icon.svg" alt="Menu Icon" />
            </Button>
          </Box>

          <Link to="/">
            <Box
              component="img"
              src="/assets/loginlogo.svg"
              alt="Logo"
              sx={{
                height: { xs: '60px', md: '77px' },
                marginRight: 2,
                display: { xs: 'none', md: 'block' },
              }}
            />
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              gap: { xs: '10px', md: '30px', lg: '50px' },
            }}
          >
            {pages.map((page) => (
              <Button
                disableRipple
                key={page.id}
                onClick={() => handleCloseNavMenu(page.link)}
                sx={{
                  fontSize: { xs: '14px', md: '19px', lg: '19px' },
                  fontWeight: 500,
                  color: location.pathname === page.link ? '#024397' : '#000',
                  display: 'block',
                  '&:hover': {
                    color: '#024397',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, marginLeft: 'auto' }}>
            <Button
              onClick={() => navigate('/login')}
              variant="contained"
              sx={{
                display: 'block',
                background: 'linear-gradient(90deg, #003F91 10.93%, #1482F9 54.9%, #003F91 91.89%)',
                borderRadius: '77px',
                fontSize: '14px',
                fontWeight: 600,
                padding: '6px 26px',
              }}
            >
              Log In
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 'auto' }}>
            <Button
              onClick={() => navigate('/login')}
              variant="contained"
              sx={{
                display: 'block',
                background: 'linear-gradient(90deg, #003F91 10.93%, #1482F9 54.9%, #003F91 91.89%)',
                borderRadius: '77px',
                fontSize: { md: '14px', lg: '16px' },
                fontWeight: 600,
                padding: { md: '6px 12px', lg: '8px 26px' },
                transition: 'background-color 0.9s ease', // Adding transition for smooth animation
                '&:hover': {
                  background:
                    'linear-gradient(90deg, rgba(1, 64, 146, 0.80) 0%, rgba(14, 107, 213, 0.80) 10.67%, rgba(14, 107, 213, 0.80) 48.17%, rgba(14, 107, 213, 0.80) 87.67%, rgba(1, 64, 146, 0.80) 100%)',
                },
              }}
            >
              Log In
            </Button>
          </Box>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={() => handleCloseNavMenu()}
            sx={{
              display: { xs: 'block', md: 'block', lg: 'none' },
              width: '250px',
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.id}
                onClick={() => handleCloseNavMenu(page.link)}
                sx={{
                  color: location.pathname === page.link ? '#1481F8' : '#000',
                  backgroundColor: location.pathname === page.link ? '#EBF3FF' : 'inherit',
                }}
              >
                <Typography textAlign="center">{page.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
