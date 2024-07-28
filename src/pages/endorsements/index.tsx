import React, { FC, useState } from "react";
import Layout from "@/components/Layout";
import SearchBox from "@/components/SearchBox";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import SkillLabel from "@/components/SkillLabel";
import { endorsementsListsMock, skillMockData } from "../../../__mocks__/endorsements";
import SkillCombobox from "@/components/SkillComboBox";

type OptionTypes = {
    id: number;
    skill: string;
};

const Endorsements: FC = () => {

    const [selected, setSelected] = useState<OptionTypes | undefined>(undefined);

    const handleSkillSelect = (value : OptionTypes) => {
          setSelected(value);
    }

    const handleAddSkill = () => {
          alert("Add skill clicked");
    }

    return (
        <Layout title="Endorsements">
            <main className="my-20 mx-20 grid grid-cols-[400px_minmax(900px,_1fr)_100px] gap-1">
                <section className="ml-20 w-[50%]">
                    <h1 className="text-base font-semibold text-black pr-2">Endorsements</h1>
                    <div className="mt-6">
                        <SearchBox />
                        <div className="mt-4">
                            {endorsementsListsMock.map((endorsement) => (
                                <React.Fragment key={endorsement.id}>
                                    <div className="p-3 cursor-pointer">
                                        <h1 className="pb-2">{endorsement.endorserName}</h1>
                                        <SkillLabel title={endorsement.skill} colorScheme={endorsement.color} />
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="bg-white p-10 h-[600px]">
                    <h1 className="text-black font-semibold text-2xl">Prakash</h1>
                    <div className="flex items-center mt-8 mb-5">
                        <h3 className="text-sm mr-10 font-medium">Skill :</h3>
                        <SkillCombobox placeholder="select skill" options={skillMockData} onChange={handleSkillSelect} value={selected} handleAddSkill={handleAddSkill} />
                    </div>
                    <div className="flex items-center space-x-2 mb-5">
                        <h3 className="mr-6">vote:</h3>
                        <button className=" flex items-center p-2 rounded w-[120px]  text-blueBerry  bg-aliceBlue">
                            <BsHandThumbsUp />
                            <p className="ml-2"> Upvote</p>
                        </button>
                        <button className=" flex items-center p-2 rounded  w-[120px] text-magicRed bg-lavendarBlush">
                            <BsHandThumbsDown />
                            <p className="ml-2"> Downvote</p>
                        </button>
                    </div>
                    <div className="mb-5">
                        <h3 className="mb-2">Description</h3>
                        <textarea
                            className="border-2 resize-none p-2 border-azuresihWhite text-cadetGrey font-medium"
                            placeholder="placeholder text here"
                            rows={4}
                            cols={50}
                        ></textarea>
                    </div>
                    <button className="bg-aliceBlue text-slatGrey p-2 rounded">Complete Endorsement</button>
                </section>
            </main>
        </Layout>
    );
};

export default Endorsements;
