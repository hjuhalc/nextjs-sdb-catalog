import {
  AppShell,
  Header,
  Box,
  MediaQuery,
  Burger,
  Text,
  Checkbox,
  Navbar,
  Image,
  Flex,
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
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
];

interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
}

export default function Cart() {
  const [opened, setOpened] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);
  const [values, handlers] = useListState(mockdata);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const handleSelect = (
    event: SyntheticEvent<HTMLInputElement>,
    item: Item
  ) => {
    handlers.setItemProp(item.id, 'checked', event.currentTarget.checked);

    setSelectedItems((items) => {
      if (items.includes(item)) {
        return items.filter((i) => i.id !== item.id);
      }

      return [...items, item];
    });
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
            onChange={(event) =>
              handlers.setItemProp(
                index,
                'checked',
                event.currentTarget.checked
              )
            }
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
        <Text>${item.price}</Text>
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
          <></>
        </Navbar>
      }
    >
      <h1>Cart</h1>
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        label="Select all"
        transitionDuration={0}
        onChange={() =>
          handlers.setState((current) =>
            current.map((value) => ({ ...value, checked: !allChecked }))
          )
        }
      />
      {cartItems}
    </AppShell>
  );
}
