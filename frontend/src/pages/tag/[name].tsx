import React from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

const TagPage: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <h1>{router.query.name}</h1>
      <p>This is the blog post content.</p>
    </>
  );
};

export default TagPage;
