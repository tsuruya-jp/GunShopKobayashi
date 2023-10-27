import { useRouter } from "next/router";

type MetaProps = {
  pageTitle: string;
  pageDesc: string;
  pageType: string;
  pageIcon: string;
};

export default function Head(data: MetaProps) {
  const router = useRouter();
  const url = router.asPath;

  return (
    <>
      <title>{data.pageTitle}</title>
      <meta property="og:title" content={data.pageTitle} />
      <meta name="description" content={data.pageDesc} />
      <meta property="og:description" content={data.pageDesc} />
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={data.pageTitle} />
      <meta property="og:type" content={data.pageType} />
      <link rel="icon" href={data.pageIcon} />
      <link rel="apple-touch-icon" href={data.pageIcon} />
    </>
  );
}
