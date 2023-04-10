"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Collapse, Nav, NavbarText, NavbarToggler, NavLink } from "reactstrap";
import { useFetch } from "../hooks/useFetch";
import { NavLinks } from "./NavLinks";

export function NavbarCollapse({ user }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [submit] = useFetch();
  return (
    <>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        {user && user.email ? (
          <>
            <NavbarText>{user.email}</NavbarText>
            <Nav className="me-auto" navbar>
              <NavLink
                onClick={() => {
                  if (confirm("Are you sure you want to logout?")) {
                    submit("/auth/logout", {
                      method: "POST",
                      feedback: {
                        basedOn: "outcome",
                        map: {
                          success: {
                            message: "Logout successful",
                            intent: "success",
                          },
                        },
                      },
                    }).then(() => {
                      router.push("/");
                      router.refresh();
                    });
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                Logout
              </NavLink>
            </Nav>
          </>
        ) : (
          <Nav className="me-auto" navbar>
            <NavLinks
              links={[
                { href: "/user/login", label: "Login" },
                { href: "/user/signup", label: "Signup" },
              ]}
            />
          </Nav>
        )}
      </Collapse>
    </>
  );
}
