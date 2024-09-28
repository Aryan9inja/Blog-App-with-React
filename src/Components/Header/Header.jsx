import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => {
    state.status;
  });

  //TODO: Use redirect from react-router-dom

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    { 
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    { 
      name: "AllPosts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "AddPost",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    onClick={() => redirect(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
