import BoardCategoryRow from "./BoardCategoryRow";
import BoardDetailsRow from "./BoardDetailsRow";
import { requestBoardData } from "../../../__mocks__/requestBoardData";
import { SKILL_LABEL_COLOR_MAPPING } from "@/constants/request-board";
import { useGetEndorsements } from "@/services/endorsements";

export default function RequestBoardTable({ openDetails }: { openDetails: () => void }) {
    const { data: endorsements, isLoading } = useGetEndorsements();
    console.log(endorsements, isLoading); //will remove this when BE APIs are ready

    const renderBoardDetailsRow = requestBoardData.map((skillItem, index) => (
        <BoardDetailsRow
            key={skillItem.id}
            {...skillItem}
            colorScheme={SKILL_LABEL_COLOR_MAPPING[index % 6]}
            openDetails={openDetails}
        />
    ));
    return (
        <div>
            <div className="hidden lg:grid grid-cols-[35%_25%_minmax(0,_1fr)] p-4 mt-16 border-y border-gray-400">
                <BoardCategoryRow />
            </div>
            <div className="mt-12 lg:mt-4 grid grid-cols-1 gap-8 lg:gap-0">{renderBoardDetailsRow}</div>
        </div>
    );
}
