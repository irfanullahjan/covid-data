"use client";

import { Col, Container, Row } from "reactstrap";

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}
