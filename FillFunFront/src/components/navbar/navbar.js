import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo_white.png";

function Navbar() {
    const [isMobileNavActive, setMobileNavActive] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();
    const isQuizPage = location.pathname === '/quiz';

    // Check if the user is logged in
    const isLoggedIn = !!localStorage.getItem("authToken");

    useEffect(() => {
        if (isMobileNavActive) {
            document.body.classList.add("mobile-nav-active");
        } else {
            document.body.classList.remove("mobile-nav-active");
        }

        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isMobileNavActive]);

    const toggleMobileNav = () => {
        setMobileNavActive((prev) => !prev);
    };

    const handleSamePageLinkClick = () => {
        if (isMobileNavActive) {
            toggleMobileNav();
        }
    };

    const toggleDropdown = (e) => {
        e.preventDefault();
        setDropdownOpen((prevState) => !prevState);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <header
            id="header"
            style={{
                backgroundColor: isQuizPage
                    ? '#10058c'
                    : isScrolled
                        ? '#10058c'
                        : 'transparent',
            }}
            className="header d-flex align-items-center fixed-top"
        >
            <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                <a href="/" className="logo d-flex align-items-center">
                    <img src={Logo} alt="Logo" />
                </a>

                <nav id="navmenu" className={`navmenu ${isMobileNavActive ? "mobile-nav-active" : ""}`}>
                    <ul>
                        <li>
                            <a href="/" onClick={handleSamePageLinkClick} className="active">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/boards" onClick={handleSamePageLinkClick}>
                                Boards
                            </a>
                        </li>
                        <li>
                            <a href="/#contact" onClick={handleSamePageLinkClick}>
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="/wishlist" onClick={handleSamePageLinkClick}>
                                <i className="bi bi-heart-fill fs-6"></i>
                            </a>
                        </li>
                        <li className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
                            <a href="#" onClick={toggleDropdown}>
                                <i className="bi bi-person" style={{ fontSize: "1.5rem" }}></i>
                            </a>
                            {isDropdownOpen && (
                                <ul className="dropdown-menu">
                                    {isLoggedIn ? (
                                        <>
                                            <li>
                                                <Link to="/profile" onClick={handleSamePageLinkClick}>
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={handleLogout}
                                                    style={{
                                                        background: "none",
                                                        border: "none",
                                                        color: "inherit",
                                                        padding: "10px 15px",
                                                        cursor: "pointer",
                                                        textAlign: "left",
                                                        width: "100%",
                                                    }}
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link to="/login" onClick={handleSamePageLinkClick}>
                                                    Login
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/register" onClick={handleSamePageLinkClick}>
                                                    Register
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>

                <button
                    className={`mobile-nav-toggle d-xl-none ${isMobileNavActive ? "bi-x" : "bi-list"}`}
                    onClick={toggleMobileNav}
                ></button>
            </div>
        </header>
    );
}

export default Navbar;