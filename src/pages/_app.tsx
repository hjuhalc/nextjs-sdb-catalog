import RouterTransition from "@/components/RouterTransition";
import { MantineProvider } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

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
          colorScheme: "dark",
        }}
      >
        <RouterTransition />
        <main>
          <Component {...pageProps} />
        </main>
      </MantineProvider>
    </>
  );
}
