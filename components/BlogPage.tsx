import React from "react";
import dayjs from "dayjs";

import { Card, Col, Flex, Row } from "antd";

import { getPost } from "@/lib/actions";
export default async function BlogPage() {
  const postList = await getPost();
  // const postList = [];

  console.log("我执行啦");
  return (
    <div className="container mx-auto pt-5">
      <Row gutter={[20, 20]}>
        {postList &&
          postList?.map((item) => {
            const { id, url, title, createdAt, categories } = item;
            console.log(createdAt, "createdAt");
            return (
              <Col className="cursor-pointer" span={8} key={id}>
                <Card
                  styles={{ body: { padding: "0" } }}
                  style={{ width: "100%" }}
                >
                  <div
                    className=" h-48 text-white  font-bold text-xl flex justify-center items-center  md:text-2xl "
                    style={{
                      backgroundImage: `url(${url[0].toString()})`,
                      backgroundSize: "cover",
                      borderRadius: 6,
                    }}
                  >
                    {title}
                  </div>
                  <Flex
                    justify="space-between"
                    className="p-5  md:text-sm text-xs"
                  >
                    <div>{categories.map((item) => item.name).toString()}</div>
                    <div>{dayjs(createdAt).format("YYYY/MM/DD")}</div>
                  </Flex>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
}
