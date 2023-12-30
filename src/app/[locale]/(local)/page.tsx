import Index from "./";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "小林銃砲火薬店",
  }
}

const IndexPage = async () => {
  return <Index />;
};

export default IndexPage;
