import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";

import NavDropdown from "@/components/common/Navbar/NavDropdown";
import { DROPDOWN_LINKS } from "@/components/common/Navbar/navbar.constants";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

describe("NavDropdown Component", () => {
    let mockedSignoutFunction = jest.fn();

    afterEach(() => {
        queryClient.clear();
    });

    it("should render the dropdown correctly", () => {
        render(<NavDropdown onSignoutClick={mockedSignoutFunction} />);

        const list = screen.getAllByRole("link");
        const signoutButton = screen.getByRole("button");

        DROPDOWN_LINKS.forEach((link, index) => {
            expect(list[index]).toHaveAttribute("href", link.link);
            expect(list[index]).toHaveTextContent(link.name);
        });

        expect(signoutButton).toBeInTheDocument();
    });

    it("should trigger the signout function", () => {
        render(<NavDropdown onSignoutClick={mockedSignoutFunction} />);

        const signoutButton = screen.getByRole("button");

        fireEvent.click(signoutButton);

        expect(mockedSignoutFunction).toHaveBeenCalled();
    });
});
