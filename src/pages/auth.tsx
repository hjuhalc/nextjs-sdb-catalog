import {
  Button,
  Container,
  Flex,
  NumberInput,
  Paper,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  loginForm: {
    width: "50%",

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export default function Auth() {
  const { classes } = useStyles();

  return (
    <Container size="lg" h="100vh">
      <Flex direction="column" align="center" justify="center" h="50%">
        <h1>Sign in to Product Catalog</h1>
        <Paper shadow="xs" p="md" withBorder className={classes.loginForm}>
          <Flex direction="column" justify="flex-end">
            <NumberInput
              hideControls
              label="Mobile number"
              min={0}
              max={99999999999}
            />
            <Button mt="md">Sign In</Button>
          </Flex>
        </Paper>
      </Flex>
    </Container>
  );
}
