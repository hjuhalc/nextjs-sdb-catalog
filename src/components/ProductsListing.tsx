import {
  Container,
  Card,
  Flex,
  Image,
  Button,
  Badge,
  Group,
  Text,
  createStyles,
  Center,
  Paper,
  UnstyledButton,
} from '@mantine/core';
import {
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  TablerIcon,
} from '@tabler/icons';
import { keys } from '@mantine/utils';
import React from 'react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
  responsiveText: {
    fontSize: theme.fontSizes.md,

    [theme.fn.smallerThan('sm')]: {
      fontSize: theme.fontSizes.sm,
    },

    [theme.fn.smallerThan(600)]: {
      fontSize: theme.fontSizes.xs,
    },
  },
}));

const mockdata = [
  { label: 'Decorus', icon: IconUsers, price: 1000 },
  { label: 'Eager', icon: IconGauge, price: 2000 },
  { label: 'Poppy Petals', icon: IconManualGearbox, price: 3000 },
  { label: 'Electric Zap', icon: IconGasStation, price: 4000 },
];

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

interface RowData {
  label: string;
  icon: TablerIcon;
  price: number;
}

interface TableSortProps {
  data: RowData[];
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) => item.label.toLowerCase().includes(query));
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(data, payload.search).sort((a, b) => {
    if (a[sortBy] > b[sortBy]) {
      return payload.reversed ? -1 : 1;
    }

    if (a[sortBy] < b[sortBy]) {
      return payload.reversed ? 1 : -1;
    }

    return 0;
  });
}

function MenuItem({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;

  return (
    <UnstyledButton onClick={onSort}>
      <Group position="apart">
        <Text weight={500} size="sm">
          {children}
        </Text>
        <Center>
          <Icon size={14} stroke={1.5} />
        </Center>
      </Group>
    </UnstyledButton>
  );
}

export default function ProductListing(/*{ data }: TableSortProps*/) {
  const { classes } = useStyles();
  const [search, setSearch] = React.useState('');
  const [sortedData, setSortedData] = React.useState(mockdata);
  const [sortBy, setSortBy] = React.useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = React.useState(false);

  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size={18} className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(mockdata, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(mockdata, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const products = sortedData.map((product, idx) => (
    <Card withBorder radius="md" className={classes.card} key={idx}>
      <Card.Section className={classes.imageSection}>
        <Image src="https://i.imgur.com/ZL52Q2D.png" alt={product.label} />
      </Card.Section>

      <Group position="apart" mt="md">
        <div>
          <Text weight={500}>{product.label}</Text>
          <Text size="xs" color="dimmed">
            Free recharge at any station
          </Text>
        </div>
        <Badge variant="outline">25% off</Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text size="sm" color="dimmed" className={classes.label}>
          Basic configuration
        </Text>

        <Group spacing={8} mb={-8}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
              {product.price}
            </Text>
            <Text
              size="sm"
              color="dimmed"
              weight={500}
              sx={{ lineHeight: 1 }}
              mt={3}
            >
              per day
            </Text>
          </div>

          <Button radius="xl" style={{ flex: 1 }}>
            Rent now
          </Button>
        </Group>
      </Card.Section>
    </Card>
  ));

  return (
    <Container size="lg">
      <Paper w="auto" shadow="xs" p="md">
        <MenuItem
          reversed={reverseSortDirection}
          sorted={sortBy === 'price'}
          onSort={() => setSorting('price')}
        >
          Price
        </MenuItem>
      </Paper>
      <Flex align="center" wrap="wrap" gap={12}>
        {products.length > 0 ? products : <Text>Nothing found</Text>}
      </Flex>
    </Container>
  );
}
