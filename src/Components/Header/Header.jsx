import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

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
        <nav className="flex justify-between items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          {/* Hamburger icon for smaller screens */}
          <button
            className="md:hidden text-white focus:outline-none" // Hidden on medium screens and up
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu
          >
            {/* Hamburger Icon */}
            {isMenuOpen ? (
              <span className="block text-black text-3xl font-bold">x</span> // Close icon
            ) : (
              <span className="block text-white text-2xl">☰</span> // Open icon
            )}
          </button>
          {/* Nav Items */}
          <ul
            className={`fixed inset-y-0 right-0 bg-gray-500 z-10 transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:static md:flex md:flex-row md:bg-transparent md:translate-x-0 md:ml-auto`} // Added md:ml-auto for right alignment
            style={{ width: "75%" }} // Set the width to cover 3/4 of the screen
          >
            {/* Close button in the overlay */}
            <li className="absolute top-4 left-4 md:hidden"> {/* Hidden on larger screens */}
              <button
                className="text-black text-3xl font-bold focus:outline-none" // Close button color set to black
                onClick={() => setIsMenuOpen(false)} // Close the menu
              >
                x
              </button>
            </li>
            {/* Navigation Items */}
            <div className="flex flex-col md:flex-row items-center justify-end w-full"> {/* Changed justify-center to justify-end */}
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className="text-center w-full md:w-auto py-4"> {/* Ensure items are displayed in a row on larger screens */}
                    <button
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full w-full md:w-auto" // Allow buttons to be full-width on small screens, auto width on larger screens
                      onClick={() => {
                        navigate(item.slug);
                        setIsMenuOpen(false); // Close menu after navigation
                      }}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className="text-center w-full md:w-auto py-4">
                  <LogoutBtn className="mx-auto" setIsMenuOpen={setIsMenuOpen} /> {/* Pass setIsMenuOpen to LogoutBtn */}
                </li>
              )}
            </div>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
