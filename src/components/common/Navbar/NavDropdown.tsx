import React from "react";
import { DROPDOWN_LINKS } from "./navbar.constants";
import { NavDropdownProps } from "./navbar.types";

export default function NavDropdown({ onSignoutClick }: NavDropdownProps) {
    const dropdownItems = DROPDOWN_LINKS.map((dropdownItem) => (
        <a key={dropdownItem.id} href={dropdownItem.link}>
            <li className="py-[15px] px-[30px] hover:bg-[#d0e7ff] text-sm	transition-background ease-in	text-dropdown-blue duration-[380] font-semibold">
                {dropdownItem.name}
            </li>
        </a>
    ));
    return (
        <div className="w-[150px] py-[15px] absolute shadow-dropdown z-10 top-14 right-[0px] border bg-offwhite rounded-[10px] ">
            <ul>
                {dropdownItems}
                <hr className="w-4/5 h-1 border-b-1 border-gray-950 mx-auto opacity-25" />
                <li>
                    <button
                        onClick={onSignoutClick}
                        className="w-full py-[15px] px-[30px] hover:bg-[#d0e7ff] text-sm	transition-background ease-in text-dropdown-blue duration-[380] font-semibold text-left"
                    >
                        Sign Out
                    </button>
                </li>
            </ul>
        </div>
    );
}
