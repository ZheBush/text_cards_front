import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link, Flex } from '@chakra-ui/react';
import { useAuth } from './AuthContext.tsx';

const Layout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: 'rgb(240, 240, 240)', minHeight: '100vh' }}>
      <Flex
        h="6vh"
        w="100%"
        bg="rgb(240, 240, 240)"
        justify="center"
        align="center"
      >
        <Flex
          h="100%"
          w="60%"
          justify="space-between"
          align="center"
        >
          <Link
            fontSize={16}
            color="rgb(4, 120, 87)"
            p={2}
            onClick={handleAuthClick}
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
          >
            {user ? user.email : 'login'}
          </Link>

          <Flex>
            <Link
              fontSize={16}
              color="rgb(4, 120, 87)"
              p={2}
              onClick={() => navigate('/groups')}
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              Groups
            </Link>
            <Link
              fontSize={16}
              color="rgb(4, 120, 87)"
              p={2}
              onClick={() => navigate('/history')}
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              History
            </Link>
          </Flex>
        </Flex>
      </Flex>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;