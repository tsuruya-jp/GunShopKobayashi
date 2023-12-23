"use client";

import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations();
  return (
    <main className="w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]">
      <h1 className="title font-bold mb-14" suppressHydrationWarning={true}>
        {t("About.Headline")}
      </h1>
      <h2 className="text-xl mb-6">会社情報</h2>
      <div className="mb-16">
        <table className="w-[85%] max-w-[840px] table-fix border-corapse mx-auto text-center">
          <tbody
            className="
              [&_td]:text-sm
              [&_td]:font-bold
              [&_td]:py-2
              [&_td]:border-2
              [&_td]:bg-gradient-to-tr
              [&_td]:from-[#DFB94A]
              [&_td]:from-40%
              [&_td]:via-[#FFDC72]
              [&_td]:via-80%
              [&_td]:to-[#DFB94A]
              [&_td]:text-[#3F5D75]
              [&_td]:border-[#3F5D75]
            "
          >
            <tr>
              <td className="w-1/4">会社名</td>
              <td>（有）小林銃砲火薬店</td>
            </tr>
            <tr>
              <td>住所</td>
              <td>
                〒602-8352
                <br />
                京都府京都市上京区下立売通千本西入稲葉町稲葉町466
              </td>
            </tr>
            <tr>
              <td>電話番号</td>
              <td>075-841-8866</td>
            </tr>
            <tr>
              <td>FAX</td>
              <td>075-801-1557</td>
            </tr>
            <tr>
              <td>代表者</td>
              <td>小林 良幸</td>
            </tr>
            <tr>
              <td>創業</td>
              <td>1958年4月7日</td>
            </tr>
            <tr>
              <td>事業内容</td>
              <td>猟銃火薬類等の販売<br/>産業火薬類の販売及び運搬</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 className="text-xl mb-6">事業内容</h2>
      <ul className="list-disc list-inside">
        <li>銃砲・火薬販売</li>
        <li>シューティング・ハンティング グッズ販売</li>
        <li>産業火薬販売・運搬</li>
        <li>不動産</li>
      </ul>
    </main>
  );
};

export default About;
