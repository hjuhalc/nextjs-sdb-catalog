import { NavLink, createStyles } from "@mantine/core";
import { IconHome, IconShoppingCart, IconUser } from "@tabler/icons";
import Link from "next/link";
import React from "react";

type CommonNavProps = {
  active: string;
};

const useStyles = createStyles((theme) => ({
  navlink: {
    textDecoration: "none",
  },
}));

export default function CommonNav({ active }: CommonNavProps) {
  const { classes } = useStyles();

  return (
    <>
      <Link href="/" className={classes.navlink}>
        <NavLink
          label="Home"
          icon={<IconHome size={18} />}
          active={active === "home"}
        />
      </Link>
      <Link href="/account" className={classes.navlink}>
        <NavLink
          label="Account"
          icon={<IconUser size={18} />}
          active={active === "account"}
        />
      </Link>
      <Link href="/cart" className={classes.navlink}>
        <NavLink
          label="Cart"
          icon={<IconShoppingCart size={18} />}
          active={active === "cart"}
        />
      </Link>
    </>
  );
}
