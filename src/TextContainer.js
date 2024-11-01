import React from 'react';
import './TextContainer.css';

const TextContainer = ({ title, content }) => {
  return (

    <div class="parent-container">
        <div className="text-container">
        {title && <h3>{title}</h3>}
        {content && <p dangerouslySetInnerHTML={{ __html: content }}></p>}
        </div>
    </div>

    
  );
}

export default TextContainer;
