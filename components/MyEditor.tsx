"use client";

import { Button, Drawer, Form, Input, message, Select, Upload } from "antd";

import { createPost, getTag } from "@/lib/actions";
import { useMemo, useRef } from "react";
import { useRequest } from "ahooks";
import { PlusOutlined } from "@ant-design/icons";

import dynamic from "next/dynamic";
type Props = {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
};

const MyEditor: React.FC<Props> = ({ visible, onOk, onCancel }) => {
  const Editor = dynamic(() => import("./Editor"), {
    ssr: false,
  });
  const handleVideoUpload = () => {
    const fileInput = document?.createElement("input");
    fileInput.type = "file";
    fileInput.click();

    fileInput.onchange = async () => {
      if (fileInput) {
        const file = (fileInput as any)?.files[0];
        if (qRef.current) {
          const quill = (qRef.current as any)?.getEditor();
          const editor = quill.editor;
          const range = quill.getSelection();
          console.log(URL.createObjectURL(file), "1");
          if (editor && editor?.insertEmbed) {
            editor?.insertEmbed(
              range.index,
              "video",
              URL.createObjectURL(file)
            );
          }
        }
      }
      // 这里可以添加视频文件验证逻辑
      // 获取视频文件后，你可以上传到服务器，并获取视频的URL
    };
  };
  const { data: tagList } = useRequest(getTag, {
    ready: visible,
  });

  const qRef = useRef<any>();

  // 定义中文 title 的配置对象
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["clean"],
          ["link", "image", "video"], // 添加video按钮
        ],
        handlers: {
          video: handleVideoUpload,
        },
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "direction",
    "link",
    "image",
    "video",
  ];
  return (
    <Drawer
      onClose={() => {
        onCancel();
      }}
      width="50%"
      open={visible}
    >
      <Form
        onFinish={async (value) => {
          const { url, ...rest } = value;
          try {
            await createPost({
              ...rest,
              url: url.map((item: { url: string }) => item.url),
            });
            onOk();
            message.success("提交成功!");
          } catch (error: any) {
            message.error(error?.message);
          }
        }}
      >
        <Form.Item label="title" name="title">
          <Input.TextArea style={{ width: 400 }} />
        </Form.Item>
        <Form.Item label="tag" name="tag">
          <Select
            fieldNames={{ label: "name", value: "id" }}
            mode="multiple"
            style={{ width: 200 }}
            options={tagList}
          />
        </Form.Item>
        <Form.Item
          name="url"
          getValueFromEvent={(e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList.map((file: any) => {
              const { status, response } = file;
              console.log(file, "1");
              if (status == "done") {
                if (response?.code == 200) {
                  file.url = file.response.data;
                } else {
                  file.status = "error";
                }
              }
              return file;
            });
          }}
          valuePropName="fileList"
          label="url"
        >
          <Upload action="/api/upload" listType="picture-card">
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="content" name="content">
          <Editor />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            <div>submit</div>
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default MyEditor;
