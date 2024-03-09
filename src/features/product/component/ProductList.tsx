const ProductList = ({ items, open }: { items: ProductData[]; open: (i: number) => void }) => {
  const list = items.map((v: ProductData, i: number) => {
    return (
      <div key={i.toString()} className="mb-4 flex items-baseline [&_p]:text-xs">
        <button onClick={() => open(i)} className="hover:text-gray-400 mr-4">
          {v.name}
        </button>
      </div>
    );
  });

  return <>{list}</>;
};

export default ProductList;
