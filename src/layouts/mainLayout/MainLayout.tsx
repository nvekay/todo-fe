"use client";

import { StyledLayoutHeader, StyledSection } from "./MainLayout.style";
import React from "react";

type Props = {};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledSection>
      <StyledLayoutHeader>Todo list</StyledLayoutHeader>
      {children}
    </StyledSection>
  );
};

export default MainLayout;
