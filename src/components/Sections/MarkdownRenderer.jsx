import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkCaptions from "remark-captions";
import styled from "styled-components";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiArxiv, SiRoblox, SiGradio, SiCodepen } from "react-icons/si";

// Import all images from /src/assets/img/blogs
const importAllImages = (requireContext) => {
  let images = {};
  requireContext.keys().forEach((key) => {
    images[key.replace("./", "")] = requireContext(key);
  });
  return images;
};
const images = importAllImages(
  require.context("../../assets/img/blogs", false, /\.(png|jpe?g|svg|gif)$/)
);

// Styled Components
const MarkdownContainer = styled.div`
  padding: 20px;

  ul,
  ol {
    margin-left: 1.5em;
    padding-left: 1.5em;
  }

  hr {
    margin-top: 2em;
    border: none;
    height: 1px;
    background: #ccc;
  }

  /* Code block styling */
  pre {
    background: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
  }

  /* Special styling for BibTeX */
  pre.language-bibtex {
    background: #eef7ff;
    border-left: 5px solid #007acc;
  }

  /* TABLE STYLING */
  /* Removed figure/figcaption usage for consistency with images */

  table {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  th,
  td {
    white-space: pre-wrap; /* Allows line breaks */
    word-break: break-word;
    border: 1px solid #ccc;
    padding: 12px;
  }

  th {
    background-color: #f4f4f4;
  }

  /* Custom styling for links */
  .custom-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 600;
    color: #007acc;
    text-decoration: none;
    transition: 0.3s;
  }

  .custom-link:hover {
    color: #005fa3;
  }

  /* Image and table wrapper & caption styling */
  .image-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }

  /* Caption styling shared by images & tables */
  .caption {
    font-size: 18px;
    color: #999; /* Light grey color */
    margin-top: 5px;
    text-align: justify; /* Justify the caption */
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;

    a {
      color: orange; /* Set link color to orange */
      text-decoration: none;
    }

    a:hover {
      color: #ff8c00;
    }
  }
`;

// Custom Component for External Links with Icons
const CustomLink = ({ href, children }) => {
  let icon = null;

  if (href.includes("arxiv.org")) {
    icon = <SiArxiv size={22} color="#b31b1b" />;
  } else if (href.includes("github.com")) {
    icon = <FaGithub size={22} color="#333" />;
  } else if (href.includes("roblox.com")) {
    icon = <SiRoblox size={22} color="#c42b1c" />;
  } else if (href.includes("twitter.com") || href.includes("x.com")) {
    icon = <FaXTwitter size={22} color="#000" />;
  } else if (href.includes("discord.gg") || href.includes("discord.com")) {
    icon = <FaDiscord size={22} color="#5865F2" />;
  } else if (href.includes("gradio.live")) {
    icon = <SiCodepen size={22} color="#FF4B4B" />;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="custom-link">
      {icon} {children}
    </a>
  );
};

export default function MarkdownRenderer({ filePath }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((err) => console.error("Error loading markdown file:", err));
  }, [filePath]);

  return (
    <MarkdownContainer>
      <ReactMarkdown
        children={content}
        remarkPlugins={[
          remarkGfm,
          [remarkCaptions, { external: { table: "Table:" } }]
        ]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // TABLE RENDERING (using same .image-wrapper + .caption style)
          table: ({ node, children, ...props }) => {
            // Extract caption from remark-captions
            const title = node.data?.caption
          
            return (
              <div className="image-wrapper">
                <table {...props}>{children}</table>
                {title && (
                  <div className="caption">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {title}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            );
          },
          thead: ({ node, children, ...props }) => (
            <thead {...props}>{children}</thead>
          ),
          tbody: ({ node, children, ...props }) => (
            <tbody {...props}>{children}</tbody>
          ),

          tr: ({ node, children, ...props }) => <tr {...props}>{children}</tr>,
          
          td: ({ node, children, ...props }) => (
            <td {...props}>
              {typeof children === 'string' 
                ? children.split('\\n').map((str, i) => (
                    <React.Fragment key={i}>
                      {str}
                      {i !== children.split('\\n').length - 1 && <br />}
                    </React.Fragment>
                  ))
                : children}
            </td>
          ),
          th: ({ node, children, ...props }) => (
            <th {...props}>
              {typeof children === 'string'
                ? children.split('\\n').map((str, i) => (
                    <React.Fragment key={i}>
                      {str}
                      {i !== children.split('\\n').length - 1 && <br />}
                    </React.Fragment>
                  ))
                : children}
            </th>
          ),

          // LINK RENDERING
          a: ({ href, children }) => {
            if (
              href.includes("arxiv.org") ||
              href.includes("github.com") ||
              href.includes("roblox.com") ||
              href.includes("twitter.com") ||
              href.includes("x.com") ||
              href.includes("discord.gg") ||
              href.includes("discord.com") ||
              href.includes("gradio.live")
            ) {
              return <CustomLink href={href}>{children}</CustomLink>;
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },

          // IMAGE RENDERING
          img: ({ src, alt = '', title }) => {
            // Detect "hide" in the alt text or check if src is empty
            const hideImage = alt.startsWith("hide") || !src;
          
            return (
              <div className="image-wrapper">
                {!hideImage && <img src={images[src] || src} alt={alt.replace(/^hide\s*/, '')} />}
                {title && (
                  <div className="caption">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{title}</ReactMarkdown>
                  </div>
                )}
              </div>
            );
          },
          
          // BLOCKQUOTE RENDERING (for Author/Date metadata)
          blockquote: ({ children }) => {
            const text = children[1]?.props?.children;
          
            if (typeof text === "string") {
              if (text.startsWith("Author:")) {
                const authorName = text.replace("Author:", "").trim();
                return <div style={{ backgroundColor: "#f0f0f0", padding: "2px", borderRadius: "5px"}}>
                    <strong>Author:</strong> {authorName}
                  </div>
              } else if (text.startsWith("Date:")) {
                const dateText = text.replace("Date:", "").trim();
                return (
                  <div style={{ backgroundColor: "#f0f0f0", padding: "2px", borderRadius: "5px"}}>
                    <strong>Date:</strong> {dateText}
                  </div>
                );
              } else if (text.startsWith("TL;DR:")) {
                const tldrText = text.replace("TL;DR:", "").trim();
                return (
                  <div style={{ backgroundColor: "#f0f0f0", padding: "2px", borderRadius: "5px"}}>
                    <strong>TL;DR:</strong> {tldrText}
                  </div>
                );
              }
            }
          
            return <blockquote>{children}</blockquote>;
          },                   
        }}
      />
    </MarkdownContainer>
  );
}
