import Endorsements from "@/pages/endorsements";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

describe("Endorsements", () => {
    afterEach(() => {
        queryClient.clear();
    });

    it("renders Endorsements ui", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Endorsements />
            </QueryClientProvider>
        );
        const upvoteButton = screen.getByText("Upvote");
        const downvoteButton = screen.getByText("Downvote");
        const CompleteEndorsementButton = screen.getByText("Complete Endorsement");

        expect(screen.getByText("Endorsements")).toBeInTheDocument();
        expect(screen.getByText("search")).toBeInTheDocument();
        expect(screen.getByTestId("input")).toBeInTheDocument();
        expect(upvoteButton).toBeInTheDocument();
        expect(downvoteButton).toBeInTheDocument();
        expect(screen.getByPlaceholderText("placeholder text here")).toBeInTheDocument();
        expect(CompleteEndorsementButton).toBeInTheDocument();
    });
});
