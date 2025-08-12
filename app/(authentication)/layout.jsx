import React from "react";

const layout = ({ children }) => {
  return (
    <div className="h-full w-full grid place-items-center py-16">
      {children}
    </div>
  );
};

export default layout;
