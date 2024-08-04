import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SkillCombobox from "@/components/SkillComboBox";
import { skillMockData } from "../../../../__mocks__/endorsements";

describe("SkillCombobox Component", () => {
    it("should render with placeholder and dropdown closed", () => {
        render(<SkillCombobox options={skillMockData} placeholder="select skill" />);

        const input = screen.getByRole("combobox");
        expect(input).toHaveAttribute("placeholder", "select skill");

        expect(screen.queryByRole("listbox")).not.toBeInTheDocument(); // Check listbox is not visible
    });

    it("should open dropdown on button click and display the options", async () => {
        render(<SkillCombobox options={skillMockData} placeholder="select skill" />);

        const button = screen.getByRole("button");

        expect(screen.queryByRole("listbox")).not.toBeInTheDocument(); // Check listbox is initially closed

        fireEvent.click(button);

        await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for dropdown animation

        await screen.findByRole("listbox");

        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("Go")).toBeInTheDocument();
        expect(screen.getByText("Vanilla JS")).toBeInTheDocument();
    });

    it("Select a value from the combobox list", async () => {
        const onChangeMock = jest.fn();
        render(<SkillCombobox options={skillMockData} placeholder="select skill" onChange={onChangeMock} />);
        const button = screen.getByRole("button");

        expect(screen.queryByRole("listbox")).not.toBeInTheDocument(); // Check listbox is initially closed

        fireEvent.click(button);

        await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for dropdown animation

        await screen.findByRole("listbox");

        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("Go")).toBeInTheDocument();
        expect(screen.getByText("Vanilla JS")).toBeInTheDocument();

        fireEvent.click(screen.getByText("React"));
        expect(onChangeMock).toHaveBeenCalledWith({ id: 1, skill: "React" });
    });

    it("filters the options based on input value", async () => {
        render(<SkillCombobox onChange={() => {}} placeholder="select skill" options={skillMockData} />);
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        const button = screen.getByRole("button");
        fireEvent.click(button);
        await screen.findByRole("listbox");

        const input = screen.getByPlaceholderText("select skill");
        fireEvent.change(input, { target: { value: "React", id: 1 } });

        await waitFor(() => {
            expect(screen.getByText("React")).toBeInTheDocument();
        });

        screen.debug();
    });

    it("Display Add new Skill option when no options are present and add new skill click perform action", async () => {
        const handleAddSkill = jest.fn();

        render(<SkillCombobox options={skillMockData} placeholder="select skill" handleAddSkill={handleAddSkill} />);
        const input = screen.getByRole("combobox");
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument(); // Check listbox is initially closed

        fireEvent.change(input, { target: { value: "NonexistentSkill" } });

        await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for dropdown animation

        await screen.findByRole("listbox");

        await screen.findByText("Add New Skill");

        await fireEvent.click(screen.getByText("Add New Skill"));

        expect(handleAddSkill).toHaveBeenCalled();
    });

    it("Close the combo box when clicked outside", async () => {
        render(
            <div>
                <SkillCombobox
                    onChange={() => {}}
                    placeholder="select skill"
                    options={skillMockData}
                    handleAddSkill={() => {}}
                />
                <div data-testid="outside-element">Outside Element</div>
            </div>
        );

        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        const button = screen.getByRole("button");
        fireEvent.click(button);

        // Ensure the dropdown is open
        await screen.findByRole("listbox");
        expect(screen.getByRole("listbox")).toBeInTheDocument();

        const outsideElement = screen.getByTestId("outside-element");
        fireEvent.mouseDown(outsideElement);
        fireEvent.mouseUp(outsideElement);
        fireEvent.click(outsideElement);

        // Wait for the dropdown to close
        await waitFor(() => {
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });
    });
});
