import Endorsements from "@/pages/endorsements";
import { render, screen } from "@testing-library/react";

describe("Endorsements", () => {
    test("renders Endorsements ui", () => {
        render(<Endorsements />);
        const skillCombobox = screen.getByText("select skill");
        const upvoteButton = screen.getByText("Upvote");
        const downvoteButton = screen.getByText("Downvote");
        const CompleteEndorsementButton = screen.getByText("Complete Endorsement");
        
        expect(screen.getByText("Endorsements")).toBeInTheDocument();
        expect(screen.getByText("search")).toBeInTheDocument();
        expect(screen.getByTestId("input")).toBeInTheDocument();
        expect(skillCombobox).toBeInTheDocument();
        expect(upvoteButton).toBeInTheDocument();
        expect(downvoteButton).toBeInTheDocument();
        expect(screen.getByPlaceholderText("placeholder text here")).toBeInTheDocument();
        expect(CompleteEndorsementButton).toBeInTheDocument();
    });
});
