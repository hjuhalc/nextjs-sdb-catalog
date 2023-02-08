import {
  ActionIcon,
  AppShell,
  Aside,
  Box,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Text,
} from "@mantine/core";
import { IconUser } from "@tabler/icons";
import Link from "next/link";
import React from "react";

type UserCommonProps = {
  children: React.ReactNode;
  navbar?: React.ReactNode;
  aside?: React.ReactNode;
};

export default function CommonLayout({
  children,
  navbar,
  aside,
}: UserCommonProps) {
  const [opened, setOpened] = React.useState(false);

  return (
    <AppShell
      padding="md"
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            <Text>Product Catalog</Text>

            <ActionIcon ml="auto" variant="transparent" size="lg">
              <IconUser size={18} />
            </ActionIcon>
          </Box>
        </Header>
      }
      navbar={
        navbar ? (
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            {navbar}
          </Navbar>
        ) : (
          <></>
        )
      }
      aside={
        aside ? (
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
              {aside}
            </Aside>
          </MediaQuery>
        ) : (
          <></>
        )
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.grayIconShoppingCart[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
