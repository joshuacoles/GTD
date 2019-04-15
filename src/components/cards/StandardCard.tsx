import { CardHeader, CardRightContent, CardTitle, Detail, Footer } from "../../styles/Base";
import Tag from "../Tag";
import React from "react";
import { Item } from "../../store";

export function StandardCard({
  card: {
    title,
    label,
    description,

    // tags, TODO Tags
    // tagStyle,
  }
}: { card: Item }) {
  return (
    <span>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardRightContent>{label}</CardRightContent>
      </CardHeader>

      <Detail>{description}</Detail>

      {/*{tags && (*/}
      {/*  <Footer>*/}
      {/*    {tags.map((tag: any) => (*/}
      {/*      <Tag key={tag.title} {...tag} tagStyle={tagStyle}/>*/}
      {/*    ))}*/}
      {/*  </Footer>*/}
      {/*)}*/}
    </span>
  );
}