import {
  AppShell,
  Box,
  Burger,
  Container,
  Header,
  MediaQuery,
  Text,
} from "@mantine/core";
import React from "react";

export default function CustomerDashboard() {
  const [opened, setOpened] = React.useState(false);

  return (
    <AppShell
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

            <Text>Cart</Text>
          </Box>
        </Header>
      }
    >
      <Container>
        <h1>Customer Cart</h1>
      </Container>
    </AppShell>
  );
}
