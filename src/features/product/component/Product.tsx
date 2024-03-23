import Link from "next/link";

const ProductList = ({ products }: { products: ProductData[] }) => {
  const URL = process.env.NEXT_PUBLIC_CLOUDFLARE_URL;
  const productsList = products.map((v, i) => {
      return (
        <div className="" key={i}>
          <div className="border border-[#AAA] mb-4">
            <Link href={`product/${v.name}`}>
              <img src={`${URL}${v.imageUrl}`} alt="" />
            </Link>
          </div>
          <div className="ml-2 mb-16">
            <Link href={`product/${v.name}`}>
              <p className="text-xl">{v.name}</p>
            </Link>
            <Link href={`product/${v.name}`}>
              <div className="flex items-baseline">
                <p className="text-3xl mr-1">{`¥ ${Number(v.price).toLocaleString()}`}</p>
                <p className="text-xs">(税込)</p>
              </div>
            </Link>
          </div>
        </div>
      );
  });
  return <div className="w-full flex-1">{productsList}</div>;
};

export default ProductList;
