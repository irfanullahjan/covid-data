"use client";

import Link from "next/link";
import { NavbarCollapse } from "./NavbarCollapse";
import {
  Col,
  Container,
  Navbar as ReactstrapNavbar,
  NavbarBrand,
  Row,
} from "./reactstrap";

export function Navbar({ user }: any) {
  return (
    <div className="bg-dark">
      <Container>
        <Row>
          <Col>
            <ReactstrapNavbar dark color="dark" expand="sm">
              <NavbarBrand href="/" tag={Link}>
                Covid19
              </NavbarBrand>
              <NavbarCollapse user={user} />
            </ReactstrapNavbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
