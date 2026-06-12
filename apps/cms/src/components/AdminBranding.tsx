import React from "react";

const logoStyle: React.CSSProperties = {
  display: "block",
  height: "3rem",
  width: "auto",
};

const iconStyle: React.CSSProperties = {
  display: "block",
  height: "2rem",
  width: "auto",
};

export const AdminLogo = () => (
  <img alt="Undersea Expeditions" src="/underseax-logo.png" style={logoStyle} />
);

export const AdminIcon = () => <img alt="Undersea Expeditions" src="/underseax-logo.png" style={iconStyle} />;
