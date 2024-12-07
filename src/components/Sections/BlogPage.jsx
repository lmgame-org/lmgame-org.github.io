import React from "react";
import { useParams } from "react-router-dom";
import MarkdownRenderer from "./MarkdownRenderer";

export default function BlogPage() {
  const { blogId } = useParams();
  const filePath = `/blogs/${blogId}.md`;

  return (
    <div style={{ padding: "20px" }}>
      <MarkdownRenderer filePath={filePath} />
    </div>
  );
}
