import React, { FunctionComponent } from "react";
import Head from "next/head";

interface SEOHeaderType {
  title: string;
  description: string;
  imageUrl: string;
  siteUrl: string;
  type?: string;
  sitename?: string;
  locale?: string;
}

const SEOHeader: FunctionComponent<SEOHeaderType> = ({
  title,
  description,
  imageUrl,
  siteUrl,
  type,
  sitename,
  locale,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="" />
      <meta property="og:type" content={type ?? "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta
        property="og:site_name"
        content={sitename ?? "NullPointerException"}
      />
      <meta property="og:locale" content={locale ?? "ko_KR"} />
      <meta property="og:url" content={siteUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:domain" content={siteUrl} />
      <meta name="twitter:title" property="og:title" content={title} />
      <meta
        name="twitter:description"
        property="og:description"
        content={description}
      ></meta>
    </Head>
  );
};

export default SEOHeader;
