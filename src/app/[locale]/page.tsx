import { auth } from "@/auth";
import Header from "@/components/header";
import { getTranslations } from "next-intl/server";

const Home = async () => {
  const t = await getTranslations("Index");
  const session = await auth();
  const { user } = session || {};

  const { name } = user || {};
  console.log("home 我也执行拉");
  return (
    <>
      <Header />
      <section
        style={{ backgroundImage: `url(/bg.jpg)` }}
        className=" flex flex-col h-screen font-serif bg-bottom  bg-no-repeat  font-bold  text-3xl  md:text-6xl  items-center justify-center fons bg-cover    "
      >
        {t("welcome")} {name}
      </section>
    </>
  );
};
export default Home;
