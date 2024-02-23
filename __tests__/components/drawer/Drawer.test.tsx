import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Drawer from "@/components/drawer/Drawer";

describe("Drawer", () => {
    test("when open render drawer ", () => {
        const { getByRole } = render(<Drawer open={true} onClose={() => {}} />);
        const drawer = getByRole("drawer");

        expect(drawer).toBeInTheDocument();
        expect(drawer).toHaveClass("!translate-x-0");
    });

    test("when close do not renders drawer ", () => {
        const { queryByRole } = render(<Drawer open={false} onClose={() => {}} />);
        const drawer = queryByRole("drawer");

        expect(drawer).toBeInTheDocument();
        expect(drawer).toHaveClass("translate-x-full");
    });

    test("handle onClose event", () => {
        const handleClose = jest.fn();
        const { queryByRole, getByTestId } = render(<Drawer open={true} onClose={handleClose} />);
        const drawer = queryByRole("drawer");
        const closeButton = getByTestId("close-button");

        expect(drawer).toBeInTheDocument();

        fireEvent.click(closeButton);

        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});
