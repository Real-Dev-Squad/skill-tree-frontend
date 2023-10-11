import React, { FC } from "react";
import { DropDown } from "@/components/DropDown";
import Layout from "@/components/Layout";
import SearchBox from "@/components/SearchBox";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import SkillLabel from "@/components/SkillLabel";
import { endorsementsListsMock } from "../../../__mocks__/endorsements";

const Endorsements: FC = () => {
    return (
        <Layout title="Endorsements">
            <main className="my-20 mx-20 grid grid-cols-[400px_minmax(900px,_1fr)_100px] gap-1">
                <section className="ml-20 w-[50%] ">
                    <h1 className="text-base font-semibold text-[#020617] pr-2">Endorsements</h1>
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
                    <h1 className="text-[#020617] font-semibold text-2xl">Prakash</h1>
                    <div className="flex items-center mt-8 mb-5">
                        <h3 className="text-base mr-10">skill:</h3>
                        <DropDown />
                    </div>

                    <div className="flex items-center space-x-2 mb-5">
                        <h3 className="mr-6">vote:</h3>
                        <button className=" flex items-center p-2 rounded w-[120px]  text-[#3B82F6]  bg-[#EFF6FF]">
                            <BsHandThumbsUp />
                            <p className="ml-2"> Upvote</p>
                        </button>
                        <button className=" flex items-center p-2 rounded  w-[120px] text-[#F43F5E] bg-[#FFF1F2]">
                            <BsHandThumbsDown />
                            <p className="ml-2"> Downvote</p>
                        </button>
                    </div>
                    <div className="mb-5">
                        <h3 className="mb-2">Description</h3>
                        <textarea
                            className="border-2 resize-none p-2 border-[#E2E8F0] text-[#94A3B8] font-medium"
                            placeholder="placeholder text here"
                            rows={4}
                            cols={50}
                        ></textarea>
                    </div>
                    <button className="bg-[#EFF6FF] text-[#64748B] p-2 rounded">Complete Endorsement</button>
                </section>
            </main>
        </Layout>
    );
};

export default Endorsements;
