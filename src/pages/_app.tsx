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
  Checkbox,
  NavLink,
  Flex,
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
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
