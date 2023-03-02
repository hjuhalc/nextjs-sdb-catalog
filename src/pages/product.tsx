import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Flex,
  Input,
  Loader,
  Modal,
  NumberInput,
  Text,
} from "@mantine/core";
import { IconAlertCircle, IconEdit, IconTrash } from "@tabler/icons";
import React, { ReactNode } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Product() {
  const { data, error, isLoading } = useSWR("/api/products", fetcher, {
    refreshInterval: 1000,
  });
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [alert, setAlert] = React.useState(false);
  const [modelSucess, setModalSucess] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [toEdit, setToEdit] = React.useState({ id: "", name: "", price: 0 });

  if (error) return nothing("Failed to load");
  if (isLoading) return nothing(<Loader />);

  const handleAdd = () => {
    fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ name, price }),
    }).then((res) => {
      setAlert(true);
      if (res.ok) {
        setModalSucess(true);
      } else {
        setModalSucess(false);
      }

      setName("");
      setPrice(0);
    });
  };

  const handleDelete = (id: string) => {
    fetch(`/api/products/${id}`, {
      method: "DELETE",
    }).then((res) => {
      setAlert(true);

      if (res.ok) {
        setModalSucess(true);
      } else {
        setModalSucess(true);
      }
    });
  };

  const handleUpdate = (id: string) => {
    fetch(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(toEdit),
    }).then((res) => {
      setAlert(true);
      if (res.ok) {
        setModalSucess(true);
      } else {
        setModalSucess(false);
      }
    });
  };

  return (
    <>
      <Alert
        display={alert ? "block" : "none"}
        icon={<IconAlertCircle size={16} />}
        title="Action"
        color={modelSucess ? "green" : "red"}
        withCloseButton
        variant="filled"
        onClose={() => setAlert(false)}
      >
        {modelSucess
          ? "Action completed successfully"
          : "Failed to perform action"}
      </Alert>
      <Modal opened={edit} onClose={() => setEdit(false)} title="Edit Product">
        <Flex direction="column" gap="lg">
          <Input
            placeholder="Name"
            value={toEdit.name}
            onChange={(e) => setToEdit({ ...toEdit, name: e.target.value })}
          />
          <NumberInput
            value={toEdit.price}
            onChange={(val: number) => setToEdit({ ...toEdit, price: val })}
            min={0}
          />
          <Button
            size="md"
            style={{
              alignSelf: "flex-end",
            }}
            onClick={() => {
              handleUpdate(toEdit.id);
              setEdit(false);
            }}
          >
            Submit
          </Button>
        </Flex>
      </Modal>
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
              onClick={handleAdd}
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
                  <Flex justify="space-between">
                    <Box style={{ width: 100 }}>
                      <Text fw={700} truncate>
                        {product.name}
                      </Text>
                      <Text>₱{product.price}</Text>
                    </Box>
                    <Flex direction="column">
                      <ActionIcon
                        color="blue"
                        onClick={() => {
                          setToEdit({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                          });
                          setEdit(true);
                        }}
                      >
                        <IconEdit size={18} />
                      </ActionIcon>
                      <ActionIcon
                        color="red"
                        onClick={() => handleDelete(product.id)}
                      >
                        <IconTrash size={18} />
                      </ActionIcon>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </>
  );
}

function nothing(message: string | ReactNode) {
  return (
    <Container>
      <Center h={500}>{message}</Center>
    </Container>
  );
}
