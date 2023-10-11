import React, { useState, FC } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { skillMockData } from "../../../__mocks__/endorsements";

export const DropDown: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Select an option");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className="relative group">
            <button onClick={toggleDropdown} className="flex items-center space-x-2 text-dropdown cursor-pointer">
                <span>{selectedOption}</span>
                {isOpen ? <BsChevronDown className="w-4 h-4" /> : <BsChevronUp className="w-4 h-4" />}
            </button>
            {isOpen && (
                <div className="w-56  mt-1 absolute top-10 right-0 bg-white  rounded-md shadow-lg  ">
                    <ul className="p-2">
                        <li className="p-1 cursor-pointer" onClick={() => handleOptionClick("Select an option")}>
                            Select an option
                        </li>
                        {skillMockData.map((skill) => (
                            <React.Fragment key={skill.id}>
                                <li className="p-1 cursor-pointer" onClick={() => handleOptionClick(skill.skill)}>
                                    {skill.skill}
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
