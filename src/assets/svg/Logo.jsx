import * as React from "react";

function SvgComponent() {
  return (
    <svg 
      width="100" 
      height="100" 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle 
        cx="50" 
        cy="50" 
        r="25" 
        fill="rgb(100,111, 111)" 
      />
      <text 
        x="50%" 
        y="50%" 
        fill="white" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        fontFamily="Arial, sans-serif" 
        fontSize="20"
      >
        GA
      </text>
    </svg>
  );
}

export default SvgComponent;
