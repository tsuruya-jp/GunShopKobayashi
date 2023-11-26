"use client";

import Slider from "@/features/slider/components/Slider";
import useSWR from "swr";

const conditionType = {
  New: 0,
  Old: 1,
};

const gunType = {
  Hunting: 0,
  Sporting: 1,
  Rifle: 2,
  Air: 3,
};

const Product = ({ params }: { params: { id: string } }) => {
  const fetcher = (url: string) =>
    fetch(`/api/product/get?id=${url}`, { cache: "no-store" }).then((res) => res.json());
  const { data } = useSWR(params.id, fetcher);
  if (!data) return loading();

  const items = [{ id: 0, content: "/" + data.image }];
  data.images
    ? Object.keys(data.images).map((v: any) => {
        return items.push({ id: Number(v), content: data.images[v] });
      })
    : null;
  const pull = data.pull ?? "-";
  const condition = () => {
    switch (data.condition) {
      case conditionType.New:
        return "新銃";
      case conditionType.Old:
        return "中古銃";
      default:
        return "";
    }
  };
  const type = () => {
    switch (data.type) {
      case gunType.Hunting:
        return "狩猟銃";
      case gunType.Sporting:
        return "クレー射撃銃";
      case gunType.Rifle:
        return "ライフル銃";
      case gunType.Air:
        return "エアライフル銃";
      default:
        return "";
    }
  };
  return (
    <main className={`w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]`}>
      <div className="w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]">
        <h1 className="title font-bold mb-14">{data.name}</h1>
        <div className="mb-8">
          <Slider items={items} top={false} />
        </div>
        <div className="flex items-baseline mb-6">
          <p className="text-3xl mr-1">{`¥ ${Number(data.price).toLocaleString()}`}</p>
          <p className="text-xs">(税込)</p>
        </div>
        <table className="product-detail">
          <tbody>
            <tr>
              <th>銃種</th>
              <td>{type()}</td>
            </tr>
            <tr>
              <th>口径</th>
              <td>{data.caliber}</td>
            </tr>
            <tr>
              <th>メーカー</th>
              <td>{data.manufacturer}</td>
            </tr>
            <tr>
              <th>モデル</th>
              <td>{data.model}</td>
            </tr>
            <tr>
              <th>銃身長</th>
              <td>{`${data.barrelLength} "`}</td>
            </tr>
            <tr>
              <th>重量</th>
              <td>{`${data.weight} kg`}</td>
            </tr>
            <tr>
              <th>プル</th>
              <td>{`${pull} mm`}</td>
            </tr>
            <tr>
              <th>程度</th>
              <td>{condition()}</td>
            </tr>
            <tr>
              <th>備考</th>
              <td>{data.remarks}</td>
            </tr>
          </tbody>
        </table>
        <div className="whitespace-pre-wrap">{data.description}</div>
      </div>
    </main>
  );
};

const loading = () => {
  return (
    <div
      className={`w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]`}
      style={{ minHeight: "calc(100vh - 640px)" }}
    >
      now loading
    </div>
  );
};

export default Product;
