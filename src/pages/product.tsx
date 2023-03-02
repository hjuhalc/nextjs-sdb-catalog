import {
  Alert,
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Flex,
  Input,
  NumberInput,
  ScrollArea,
  Text,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Product() {
  const { data, error, isLoading } = useSWR("/api/products", fetcher, {
    refreshInterval: 1000,
  });
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [alert, setAlert] = React.useState(false);
  const [addSuccess, setAddSucess] = React.useState(false);

  if (error) return nothing("Failed to load");
  if (isLoading) return nothing("Loading...");

  return (
    <>
      <Alert
        display={alert ? "block" : "none"}
        icon={<IconAlertCircle size={16} />}
        title="Product added"
        color={addSuccess ? "green" : "red"}
        withCloseButton
        variant="filled"
        onClose={() => setAlert(false)}
      >
        {addSuccess ? "Product added successfully" : "Failed to add product"}
      </Alert>
      <Container h="100vh">
        <Flex h="100%" direction="column" justify="center">
          <Flex direction="column" gap="lg">
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                mb="md"
              />
              <NumberInput
                value={price}
                onChange={(val: number) => setPrice(val)}
                min={0}
              />
            </Card>
            <Button
              size="md"
              style={{
                alignSelf: "flex-end",
              }}
              onClick={() => {
                fetch("/api/products", {
                  method: "POST",
                  body: JSON.stringify({ name, price }),
                }).then((res) => {
                  if (res.ok) {
                    setAlert(true);
                    setAddSucess(true);
                  } else {
                    setAlert(false);
                    setAddSucess(true);
                  }

                  setName("");
                  setPrice(0);
                });
              }}
            >
              Submit
            </Button>
          </Flex>

          <Divider my="lg" label={<Text fz="xl">Products</Text>} />

          <Box h="50%">
            <Flex gap="lg" wrap="wrap">
              {data[0]?.result?.map((product: any) => (
                <Card
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                  key={product.id}
                  w={200}
                >
                  <Text>Name: {product.name}</Text>
                  <Text>Price: {product.price}</Text>
                </Card>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </>
  );
}

function nothing(message: string) {
  return (
    <Container>
      <Center h={500}>{message}</Center>
    </Container>
  );
}
