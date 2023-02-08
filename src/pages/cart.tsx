import {
  ActionIcon,
  AppShell,
  Button,
  Header,
  Box,
  MediaQuery,
  Burger,
  Text,
  Checkbox,
  Navbar,
  Image,
  Flex,
  Paper,
  Container,
  ScrollArea,
  Grid,
  Divider,
  NavLink,
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { IconShoppingCart, IconTrash, IconUser } from '@tabler/icons';
import Link from 'next/link';
import React from 'react';

type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  checked?: boolean;
};

const mockdata = [
  {
    id: 1,
    name: 'Nike Air Force 1',
    price: 100,
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/73eb7950-edf2-4dbf-96c3-9b684fe974a9/flex-experience-run-11-next-nature-road-running-shoes-rB6h46.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    checked: false,
  },
  {
    id: 2,
    name: 'Nike Air Force 1',
    price: 100,
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/73eb7950-edf2-4dbf-96c3-9b684fe974a9/flex-experience-run-11-next-nature-road-running-shoes-rB6h46.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    checked: false,
  },
  {
    id: 3,
    name: 'Nike Air Force 1',
    price: 100,
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/73eb7950-edf2-4dbf-96c3-9b684fe974a9/flex-experience-run-11-next-nature-road-running-shoes-rB6h46.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    checked: false,
  },
  {
    id: 4,
    name: 'Nike Air Force 1',
    price: 100,
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/73eb7950-edf2-4dbf-96c3-9b684fe974a9/flex-experience-run-11-next-nature-road-running-shoes-rB6h46.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    checked: false,
  },
  {
    id: 5,
    name: 'Nike Air Force 1',
    price: 100,
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/73eb7950-edf2-4dbf-96c3-9b684fe974a9/flex-experience-run-11-next-nature-road-running-shoes-rB6h46.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    checked: false,
  },
  {
    id: 6,
    name: 'Nike Air Force 1',
    price: 100,
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/73eb7950-edf2-4dbf-96c3-9b684fe974a9/flex-experience-run-11-next-nature-road-running-shoes-rB6h46.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    checked: false,
  },
];

interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
}

const DELIVERY_FEE = 50;

export default function Cart() {
  const [opened, setOpened] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);
  const [values, handlers] = useListState(mockdata);
  const [hasSubtotal, setHasSubtotal] = React.useState(false);

  const allChecked = values.every((value) => value.checked);

  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const handleSelectAll = (event: SyntheticEvent<HTMLInputElement>) => {
    handlers.setState((current) =>
      current.map((value) => ({ ...value, checked: !allChecked }))
    );

    setSelectedItems(event.currentTarget.checked ? [...values] : []);
  };

  const handleSelect = (
    event: SyntheticEvent<HTMLInputElement>,
    item: Item,
    index: number
  ) => {
    handlers.setItemProp(index, 'checked', event.currentTarget.checked);

    setSelectedItems((items) => {
      if (items.filter((i) => i.id === item.id).length > 0) {
        console.log('remove');
        return items.filter((i) => i.id !== item.id);
      }

      return [...items, item];
    });
  };

  const computeSubtotal = () => {
    return selectedItems.reduce((acc, item) => acc + item.price, 0);
  };

  const computeTotal = () => {
    return computeSubtotal() + DELIVERY_FEE;
  };

  const cartItems = values.map((item, index) => (
    <Box key={item.id} mt="md">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Flex align="center" justify="center" gap="sm">
          <Checkbox
            checked={item.checked}
            onChange={(event) => handleSelect(event, item, index)}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              borderRadius: 'sm',
              overflow: 'hidden',
              backgroundColor: 'gray',
              mr: 'md',
            }}
          >
            <Image src={item.image} alt={item.name} />
          </Box>
          <Text>{item.name}</Text>
        </Flex>
        <Text mx="xl" weight={700}>
          ₱{item.price}
        </Text>
      </Box>
    </Box>
  ));

  return (
    <AppShell
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
          </Box>
        </Header>
      }
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <NavLink label="Account" icon={<IconUser size={18} />} />
          </Link>
          <NavLink label="Cart" icon={<IconShoppingCart size={18} />} />
        </Navbar>
      }
    >
      <Flex wrap="wrap" w="100%" gap="sm">
        <Paper
          shadow="xs"
          p="md"
          withBorder
          sx={{
            flexGrow: 1,
          }}
        >
          <Flex align="center" justify="space-between" mb="sm">
            <Checkbox
              checked={allChecked}
              indeterminate={indeterminate}
              label="Select all"
              onChange={(e) => handleSelectAll(e)}
            />
            <ActionIcon color="dark" size="sm" variant="transparent">
              <IconTrash />
            </ActionIcon>
          </Flex>

          <ScrollArea style={{ height: 250 }}>{cartItems}</ScrollArea>
        </Paper>
        <Paper
          shadow="xs"
          p="md"
          withBorder
          sx={{
            flexGrow: 1,
          }}
        >
          <Flex direction="column" justify="space-between" h="100%">
            <Text>Selected items: {selectedItems.length}</Text>

            <Divider />

            <Grid mt="sm">
              <Grid.Col span={6}>
                <Text>Subtotal</Text>
                <Text>Shipping</Text>
                <Text>Tax</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text align="right">₱{computeSubtotal()}</Text>
                <Text align="right">₱{DELIVERY_FEE}</Text>
                <Text align="right">₱0</Text>
              </Grid.Col>
            </Grid>

            <Divider />

            <Grid mt="sm">
              <Grid.Col span={6}>
                <Text>Total</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Flex align="center" justify="flex-end" gap="sm">
                  <Text fz="xs" c="dimmed">
                    PHP
                  </Text>
                  <Text fw={700} size="xl">
                    ₱{computeTotal()}
                  </Text>
                </Flex>
              </Grid.Col>
            </Grid>

            <Button
              mt="md"
              size="lg"
              fullWidth
              disabled={selectedItems.length === 0}
            >
              Checkout
            </Button>
          </Flex>
        </Paper>
      </Flex>
    </AppShell>
  );
}
