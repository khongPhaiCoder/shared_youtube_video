import React from "react";
import { HeaderItemProps } from "./HeaderItem.types";
import { Button, Container, Link } from "@/components/atoms";

const HeaderItem: React.FC<HeaderItemProps> = ({ link, title }) => {
  return (
    <Button variant="text">
      <Link href={link}>{title}</Link>
    </Button>
  );
};

export default HeaderItem;
