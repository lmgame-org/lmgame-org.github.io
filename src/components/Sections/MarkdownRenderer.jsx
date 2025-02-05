import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa"; // GitHub icon
import { SiArxiv } from "react-icons/si"; // ArXiv icon
import { SiRoblox } from "react-icons/si"; // Roblox icon

// Import all images from /src/assets/img/blogs
const importAllImages = (requireContext) => {
  let images = {};
  requireContext.keys().forEach((key) => {
    images[key.replace("./", "")] = requireContext(key);
  });
  return images;
};
const images = importAllImages(require.context("../../assets/img/blogs", false, /\.(png|jpe?g|svg)$/));

// Styled Components for Markdown Rendering
const MarkdownContainer = styled.div`
  padding: 20px;

  ul, ol {
    margin-left: 1.5em; /* Add indentation to list items */
    padding-left: 1.5em; /* Ensure bullets are aligned properly */
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

  /* Custom styling for ArXiv, GitHub, and Roblox links */
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

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 20px 0;
  }

  .caption {
    font-size: 20px;
    color: #999; /* Light grey color */
    margin-top: 5px;
    text-align: justify; /* Justify the caption */
    max-width: 80%; /* Keep captions narrower for better readability */
    margin-left: auto;
    margin-right: auto; /* Center the caption */
  }

  .caption a {
    color: orange; /* Set links in captions to orange */
    text-decoration: none;
  }

  .caption a:hover {
    color: #ff8c00; /* Darker orange on hover */
  }
`;

// Custom Component for Arxiv, GitHub, and Roblox Links
const CustomLink = ({ href, children }) => {
  let icon = null;

  if (href.includes("arxiv.org")) {
    icon = <SiArxiv size={22} color="#b31b1b" />;
  } else if (href.includes("github.com")) {
    icon = <FaGithub size={22} color="#333" />;
  } else if (href.includes("roblox.com")) {
    icon = <SiRoblox size={22} color="#c42b1c" />;
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
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            if (href.includes("arxiv.org") || href.includes("github.com") || href.includes("roblox.com")) {
              return <CustomLink href={href}>{children}</CustomLink>;
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
          img: ({ src, alt, title }) => {
            const imageSrc = images[src]; // Map the image path to the imported image
            return (
              <div className="image-wrapper">
                {imageSrc ? <img src={imageSrc} alt={alt} /> : <img src={src} alt={alt} />}
                {title && (
                  <div className="caption">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{title}</ReactMarkdown>
                  </div>
                )}
              </div>
            );
          },
        }}
      />
    </MarkdownContainer>
  );
}