import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  AppShell,
  MantineProvider,
  Navbar,
  Header,
  Aside,
  Footer,
  Text,
  MediaQuery,
  Box,
  Burger,
  NavLink,
} from '@mantine/core';
import { IconCategory } from '@tabler/icons';
import React from 'react';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [opened, setOpened] = React.useState(false);

  return (
    <>
      <Head>
        <title>Product Catalog</title>
        <meta
          name="description"
          content="An example product catalog built using Next.js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
        }}
      >
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
                <Text>Application sidebar</Text>
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

                <Text>Application header</Text>
              </Box>
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </>
  );
}
