import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { NavbarLink } from "@/components/common/Navbar/navbar.types";
import { NAVBAR_LINKS, SIGNIN_URL } from "@/components/common/Navbar/navbar.constants";

import Navbar from "@/components/common/Navbar/Navbar";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

describe("Navbar Component", () => {
    afterEach(() => {
        queryClient.clear();
    });

    it("should render the Navbar", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Navbar />
            </QueryClientProvider>
        );
        const nav = screen.getByRole("banner");

        expect(nav).toBeInTheDocument();

        // nav links assertions - desktop
        NAVBAR_LINKS.forEach((link: NavbarLink) => {
            const navLink = screen.getAllByText(link.name)[0];
            expect(navLink).toHaveTextContent(link.name);
        });

        // signin button assertions
        const signinButton = screen.getByTestId("signin-button");
        const signInText = screen.getByText("Sign in with Github");

        expect(signInText).toBeInTheDocument();
        expect(signinButton).toBeInTheDocument();
        expect(signinButton).toHaveAttribute("href", SIGNIN_URL);
    });

    it("should render the mobile navbar when hamburger button is clicked", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Navbar />
            </QueryClientProvider>
        );

        const mobileNav = screen.queryByTestId("mobile-nav");
        const hamburgerButton = screen.queryByRole("button");

        // hamburgerButton assertions
        expect(hamburgerButton).toBeInTheDocument();
        expect(hamburgerButton).toHaveClass("hamburger");

        // toggle navlinks assertions
        expect(mobileNav).toHaveClass("hidden");

        fireEvent.click(hamburgerButton!);

        expect(mobileNav).toHaveClass("visible");

        // nav links assertions - mobile
        NAVBAR_LINKS.forEach((link: NavbarLink) => {
            const navLink = screen.queryAllByText(link.name)[1];
            expect(navLink).toHaveTextContent(link.name);
        });
    });

    it("should render the user first name in navbar with profile picture", async () => {
        jest.mock("../../../../src/services/users", () => {
            return {
                useGetSelfUser: () => ({
                    isLoading: false,
                    isError: false,
                    data: {
                        first_name: "Satyam",
                        picture: {
                            url: "https://myprofilepicurl.com",
                        },
                    },
                }),
            };
        });

        render(
            <QueryClientProvider client={queryClient}>
                <Navbar />
            </QueryClientProvider>
        );

        const name = await screen.findByTestId("navbar-name");
        expect(name).toBeInTheDocument();
        expect(name).toHaveTextContent("Hello, Satyam");
    });
});
