import CommonLayout from "@/components/CommonLayout";
import CommonNav from "@/components/CommonNav";
import { Paper, Text } from "@mantine/core";

export default function Account() {
  return (
    <CommonLayout navbar={<CommonNav active="account" />}>
      <Paper
        shadow="xs"
        p="md"
        withBorder
        sx={{
          flexGrow: 1,
        }}
      >
        <Text>Name</Text>
        <Text>Email</Text>
        <Text>Phone</Text>
      </Paper>
    </CommonLayout>
  );
}
