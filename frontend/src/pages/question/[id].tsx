import React from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

const QuestionPage: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <h1>{router.query.id}</h1>
      <p>This is the blog post content.</p>
    </>
  );
};

export default QuestionPage;
