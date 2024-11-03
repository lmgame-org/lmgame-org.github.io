import React from 'react';
import './TextContainer.css';

function TextContainer({ title, content1, content2 }) {
  return (
    <div class="parent-container">
      <div className="text-container">
        {title && <h3>{title}</h3>}
        <p dangerouslySetInnerHTML={{ __html: content1 }}></p>
        <p>{content2}</p>
      </div>
    </div>
  );
}



export default TextContainer;
