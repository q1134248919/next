import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import { Video } from "@/components/video";
import "react-quill/dist/quill.snow.css";

Quill.register({ "formats/video": Video }, true);
const Editor = () => {
  const qRef = useRef<any>();
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
    <div>
      <ReactQuill ref={qRef} modules={modules} formats={formats} theme="snow" />
    </div>
  );
};

export default Editor;
