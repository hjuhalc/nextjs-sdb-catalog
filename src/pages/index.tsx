import {
  Flex,
  Text,
  Box,
  AppShell,
  Navbar,
  NavLink,
  Aside,
  Header,
  Burger,
  Checkbox,
  MediaQuery,
  ActionIcon,
} from '@mantine/core';
import { IconCategory, IconShoppingCart } from '@tabler/icons';
import Catalog from '@/components/Customer/Catalog';
import React from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [opened, setOpened] = React.useState(false);

  return (
    <main>
      <AppShell
        padding="md"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <NavLink
              label="Categories"
              icon={<IconCategory size={16} stroke={1.5} />}
            >
              <NavLink label="T-Shirt" />
              <NavLink label="Shirt" />
              <NavLink label="Hoodies" />
              <NavLink label="Shorts" />
              <NavLink label="Pants" />
            </NavLink>
          </Navbar>
        }
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
              <Flex direction="column" gap="sm">
                <Text>Brand</Text>
                <Checkbox label="Nike" />
                <Checkbox label="Louis Vuitton" />
                <Checkbox label="GUCCI" />
                <Checkbox label="Chanel" />
                <Checkbox label="Adidas" />
              </Flex>
            </Aside>
          </MediaQuery>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  mr="xl"
                />
              </MediaQuery>

              <Text>Product Catalog</Text>

              <ActionIcon
                onClick={() => router.push('/cart')}
                variant="transparent"
                color="gray"
                size="lg"
                ml="auto"
              >
                <IconShoppingCart size={20} stroke={1.5} />
              </ActionIcon>
            </Box>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.grayIconShoppingCart[0],
          },
        })}
      >
        <Catalog />
      </AppShell>
    </main>
  );
}
