import React from "react";
import Page  from "./Page";
import Container  from "./Container";
import Header from "./Header";

function AppLayout({ children, menu }) {
  return (
    <Container>
      <Page
        header={<Header menu={menu} />}
      >
        {children}
      </Page>
    </Container>
  );
}

export default AppLayout;
