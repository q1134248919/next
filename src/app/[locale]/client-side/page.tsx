import { Suspense } from "react";

import Header from "@/components/header";
import { Button } from "antd";
import { getPost } from "@/lib/actions";
import { useRouter } from "next/navigation";
import MyEditor from "@/components/MyEditor";
import BlogPage from "@/components/BlogPage";

export default function Profile() {
  console.log("page执行!");
  // const [visible, setVisible] = useState(false);
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50   ">
        <section
          style={{ backgroundImage: `url(/card.jpg)`, height: "50vh" }}
          className=" text-white    relative p-20  font-serif    bg-no-repeat  font-bold  text-3xl  md:text-6xl       bg-cover  "
        >
          <div className="client-bg" />

          <div className="z-2 mt-10 relative flex-col  h-full flex justify-center items-center">
            <div>Read Our Blog</div>
            <Button
              size="large"
              className="mt-5"
              // onClick={() => {
              //   setVisible(true);
              // }}
            >
              Create
            </Button>
          </div>
        </section>
        <Suspense fallback={"loading..."}>
          <BlogPage />
        </Suspense>
      </div>
      {/* <MyEditor
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      /> */}
    </>
  );
}
