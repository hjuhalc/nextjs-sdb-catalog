import CommonLayout from "@/components/CommonLayout";
import CommonNav from "@/components/CommonNav";
import { Box } from "@mantine/core";

export default function Account() {
  return (
    <CommonLayout navbar={<CommonNav active="account" />}>
      <Box p="xl">Account page</Box>
    </CommonLayout>
  );
}
