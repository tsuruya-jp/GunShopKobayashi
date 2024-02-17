const AdminProduct = async () => {
  const res = await fetch("http://127.0.0.1:3000/api/news/list", { cache: "no-store" });
  const data = await res.json();
  return data.data.map((v: NewsData, i: Number) =>
    <div key={i.toString()}>
      <div>{v.title}</div>
    </div>
  );
};

export default AdminProduct;
