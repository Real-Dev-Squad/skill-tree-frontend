import Image from "next/image";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogoGithub } from "react-icons/io5";

import { NAVBAR_LINKS, SIGNIN_URL } from "./navbar.constants";
import { NavbarLink } from "./navbar.types";

function Navbar() {
    const [isNavbarLinksVisible, setIsNavbarLinksVisible] = useState<boolean>(false);
    console.log("added for triggering cloudflare deployment");
    function toggleNavbarLinksVisibility() {
        setIsNavbarLinksVisible((prevState) => !prevState);
    }

    const navbarItemsMapping = NAVBAR_LINKS.map((item: NavbarLink) => (
        <li
            key={item.id}
            className="text-base font-bold max-lg:w-full max-lg:text-primary text-white hover:text-contrast "
        >
            <a className="decoration-none max-lg:p-3 max-lg:w-full max-lg:inline-block max-lg:pl-10" href={item.link}>
                {item.name}
            </a>
        </li>
    ));

    return (
        <header className="navbar bg-primary w-full flex items-center max-lg:flex-col">
            <div className="bg-primary w-full p-5 pl-10 max-sm:pl-6 flex gap-10 items-center justify-between">
                <Image className="max-lg:hidden" src="/rds-logo.svg" alt="Real Dev Squad" height={45} width={45} />
                <button onClick={toggleNavbarLinksVisibility} className="hamburger lg:hidden">
                    <GiHamburgerMenu className="text-white font-bold" size={30} />
                </button>
                <nav className="navbar__desktop max-lg:hidden visible">
                    <ul className="flex gap-10 items-center max-lg:flex-col">{navbarItemsMapping}</ul>
                </nav>
                <a data-testid="signin-button" className="ml-auto decoration-none" href={SIGNIN_URL}>
                    <span className="flex gap-2 items-center text-base max-sm:text-sm max-sm:font-bold font-semibold w-fit border text-white rounded-md py-2 p-2">
                        <span>Sign in with Github</span>
                        <IoLogoGithub size={25} />
                    </span>
                </a>
            </div>
            <nav
                data-testid="mobile-nav"
                className={`navbar__mobile ${isNavbarLinksVisible ? "visible" : "hidden"}  max-lg:w-full`}
            >
                <ul className="bg-white shadow-md  flex lg:hidden items-center max-lg:flex-col max-lg:py-3">
                    {navbarItemsMapping}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
