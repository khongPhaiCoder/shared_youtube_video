import React from "react";
import { LayoutProps } from "./Layout.types";
import { LayoutWrapper, PageWrap } from "./Layout.styled";
import Head from "next/head";
import { useReadyDocument } from "@/hooks/useReadyDocument";
import { Header } from "../Header";
import { Container } from "@/components/atoms";

const Layout: React.FC<LayoutProps> = ({ children, seoTitle, styles }) => {
  const { isDomLoaded } = useReadyDocument();

  return (
    <LayoutWrapper>
      <Head>
        <title>{seoTitle}</title>
      </Head>
      <Header />
      <PageWrap>
        <Container width="80%" lgMaxWidth="1200px" xsMargin="0 auto">
          {isDomLoaded && children}
        </Container>
      </PageWrap>
    </LayoutWrapper>
  );
};

export default Layout;
