import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import getProduct from "@/features/product/api/get";
import Slider from "@/features/slider/components/Slider";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const conditionType = {
  New: 0,
  Old: 1,
}

const gunType = {
  Hunting: 0,
  Sporting: 1,
  Rifle: 2,
  Air: 3,
}

const Product = ({ product }: { product: ProductData }) => {
  const items = [{"id": 0, "content": "/"+product.image}];
  product.images ? Object.keys(product.images).map((v: any) => {
    return items.push({"id":Number(v), "content":product.images[v]})
  }) : null;
  const pull = product.pull ?? "-";
  const condition = () => {switch(product.condition) {
    case conditionType.New:
      return "新銃"
    case conditionType.Old:
      return "中古銃"
    default:
      return ""
  }}
  const type = () => {switch(product.type) {
    case gunType.Hunting:
      return "狩猟銃"
    case gunType.Sporting:
      return "クレー射撃銃"
    case gunType.Rifle:
      return "ライフル銃"
    case gunType.Air:
      return "エアライフル銃"
    default:
      return ""
  }}
  return (
    <>
      <Header />
      <main className={`w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]`}>
        <div className="w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]">
          <h1 className="title font-bold mb-14" >{product.name}</h1>
          <div className="mb-8">
            <Slider items={items} top={false} />
          </div>
          <div className="flex items-baseline mb-6">
            <p className="text-3xl mr-1">{`¥ ${Number(product.price).toLocaleString()}`}</p>
            <p className="text-xs">(税込)</p>
          </div>
          <table className="product-detail">
            <tbody>
              <tr><th>銃種</th><td>{type()}</td></tr>
              <tr><th>口径</th><td>{product.caliber}</td></tr>
              <tr><th>メーカー</th><td>{product.manufacturer}</td></tr>
              <tr><th>モデル</th><td>{product.model}</td></tr>
              <tr><th>銃身長</th><td>{`${product.barrelLength} "`}</td></tr>
              <tr><th>重量</th><td>{`${product.weight} kg`}</td></tr>
              <tr><th>プル</th><td>{`${pull} mm`}</td></tr>
              <tr><th>程度</th><td>{condition()}</td></tr>
              <tr><th>備考</th><td>{product.remarks}</td></tr>
            </tbody>
          </table>
          <div className="whitespace-pre-wrap">{product.description}</div>
        </div>
      </main>
      <Footer />
    </>
);
};

export default Product;

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  const translations = await serverSideTranslations(locale!, ["common"]);
  if (!params) {
    return { props: {} };
  }

  const name = params.detail as string;
  const data = await getProduct(name);
  const product: ProductData = await JSON.parse(JSON.stringify(data));

  return {
    props: {
      product: product,
      ...translations,
    },
  };
};
