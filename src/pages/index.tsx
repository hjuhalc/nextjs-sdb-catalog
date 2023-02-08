import CommonLayout from "@/components/CommonLayout";
import CommonNav from "@/components/CommonNav";
import Catalog from "@/components/User/Catalog";
import { Checkbox, Flex, NavLink, Text } from "@mantine/core";
import { IconCategory } from "@tabler/icons";
import React from "react";

export default function Home() {
  return (
    <CommonLayout
      navbar={<CommonNav active="home" />}
      aside={
        <>
          <NavLink
            label="Categories"
            icon={<IconCategory size={16} stroke={1.5} />}
          >
            <NavLink label="T-Shirt" />
            <NavLink label="Shirt" />
            <NavLink label="Hoodies" />
            <NavLink label="Shorts" />
            <NavLink label="Pants" />
          </NavLink>{" "}
          <Flex direction="column" gap="sm">
            <Text>Brand</Text>
            <Checkbox label="Nike" />
            <Checkbox label="Louis Vuitton" />
            <Checkbox label="GUCCI" />
            <Checkbox label="Chanel" />
            <Checkbox label="Adidas" />
          </Flex>
        </>
      }
    >
      <Catalog />
    </CommonLayout>
  );
}
