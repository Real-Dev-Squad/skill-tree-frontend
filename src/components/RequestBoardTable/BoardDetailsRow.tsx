"use client";

import { useState } from "react";
import AvatarGroup from "../AvatarGroup";
import Button from "../Button";
import SkillLabel from "../SkillLabel";
import VotesListModal from "../VotesListModal";

type VotesTypes = {
    img?: string;
    date: string;
    name: string;
    reason: string;
};

type BoardDetailsRowProps = {
    name: string;
    skill: string;
    colorScheme: string;
    votes: VotesTypes[];
    openDetails: () => void;
};

export default function BoardDetailsRow({ name, skill, votes, colorScheme, openDetails }: BoardDetailsRowProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)] lg:grid-cols-[35%_25%_minmax(0,_1fr)] lg:px-4 lg:py-4 gap-4 lg:gap-0 border-b lg:border-0 border-gray-400 pb-8">
            <p
                className="capitalize text-2xl whitespace-nowrap w-[80%] text-ellipsis overflow-hidden lg:text-base font-semibold text-black-dark cursor-pointer hover:text-blueBerry"
                onClick={openDetails}
            >
                {name}
            </p>

            <div className="ml-auto lg:m-0">
                <SkillLabel title={skill} colorScheme={colorScheme} />
            </div>
            <div className="flex flex-col gap-8 lg:flex-row justify-between col-span-full lg:col-start-3">
                <div className="flex gap-8">
                    <div className="">
                        <span
                            className="block cursor-pointer"
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                        >
                            <AvatarGroup votes={votes} />
                        </span>
                        {isModalOpen && <VotesListModal votes={votes} onClose={() => setIsModalOpen(false)} />}
                    </div>
                    <p className="flex justify-center items-center rounded-full w-[32px] h-[32px] text-xs border">+8</p>
                </div>
                <div className="grid gap-3 grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)]">
                    <Button variant="primary" roundness="medium">
                        Approve
                    </Button>
                    <Button variant="text" roundness="medium">
                        Reject
                    </Button>
                </div>
            </div>
        </div>
    );
}
