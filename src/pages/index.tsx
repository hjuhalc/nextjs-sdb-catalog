import CommonLayout from "@/components/CommonLayout";
import CommonNav from "@/components/CommonNav";
import Catalog from "@/components/User/Catalog";
import { Checkbox, Flex, NavLink, Text } from "@mantine/core";
import { IconCategory } from "@tabler/icons";
import React from "react";

const BRANDS = ["Nike", "Louis Vuitton", "GUCCI", "Chanel", "Adidas", "Nike"];
const CATEGORIES = ["Shirt", "Shorts", "Hoodie", "Pants"];

export default function Home() {
  return (
    <CommonLayout
      navbar={<CommonNav active="home" />}
      aside={
        <Flex direction="column" gap="sm">
          <NavLink
            label="Categories"
            icon={<IconCategory size={16} stroke={1.5} />}
          >
            {CATEGORIES.map((category) => (
              <NavLink key={category} label={category} />
            ))}
          </NavLink>
          <NavLink
            label="Brands"
            icon={<IconCategory size={16} stroke={1.5} />}
          >
            {BRANDS.map((brand) => (
              <Checkbox mb="sm" key={brand} label={brand} />
            ))}
          </NavLink>
        </Flex>
      }
    >
      <Catalog />
    </CommonLayout>
  );
}
