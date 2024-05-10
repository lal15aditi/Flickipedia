import React from "react";

import "./style.scss";

const ContentWrapper = ({ children }) => (
    <div className="content-wrapper">
        {children}
    </div>
);

export default ContentWrapper;