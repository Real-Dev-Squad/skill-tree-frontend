"use client";

import { IoFilterOutline } from "react-icons/io5";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import Wrapper from "@/components/Wrapper";
import SearchBox from "@/components/SearchBox";
import Button from "@/components/Button";
import RequestBoardTable from "@/components/RequestBoardTable";
import EndorsementDetailsSlideOver from "@/components/endorsementDetailsSlideOver/EndorsementDetailsSlideOver";
import { useState } from "react";
import Layout from "@/components/Layout";

export default function Home() {
    const scrollDirection = useScrollDirection();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    return (
        <Layout title="Request board">
            <main className="my-20">
                <Button onClick={handleOpen}>Open Drawer</Button>
                <EndorsementDetailsSlideOver endorsementId="abc2" onClose={handleOpen} open={open} />

                <div className="lg:bg-white rounded-2xl lg:shadow-[0px_0px_6px_rgba(0,0,0,0.04)] w-full lg:w-11/12 max-w-screen-xl mx-auto lg:p-12">
                    <Wrapper styles="lg:hidden">
                        <h1 className="text-2xl lg:text-4xl font-semibold mb-2">Request board</h1>
                    </Wrapper>
                    <Wrapper styles="sticky top-0 bg-[#f9fafb] z-[100] py-3 lg:static lg:bg-transparent lg:py-0">
                        <div className="flex gap-4 lg:items-center lg:justify-between flex-col lg:flex-row">
                            <h1 className="hidden lg:block text-2xl lg:text-4xl font-semibold">Request board</h1>
                            <div className="flex gap-5">
                                <SearchBox />
                                <Button roundness="pill">
                                    <IoFilterOutline />
                                    <span className="hidden lg:block text-sm">Filter</span>
                                </Button>
                            </div>
                        </div>
                    </Wrapper>
                    <Wrapper>
                        <RequestBoardTable />
                    </Wrapper>
                    <Wrapper
                        styles={`${
                            scrollDirection === "up"
                                ? "sticky lg:static bottom-0 bg-[#f9fafb] lg:bg-transparent z-[100] shadow-[0_0_6px_rgba(0,0,0,0.1)] lg:shadow-none"
                                : ""
                        }`}
                    >
                        <div
                            className={`${
                                scrollDirection === "down" ? "hidden lg:flex " : ""
                            }mt-4 p-4 flex gap-4 justify-end`}
                        >
                            <Button roundness="pill" variant="outline">
                                <AiOutlineLeft />
                                <span>Prev</span>
                            </Button>
                            <Button roundness="pill" variant="secondary">
                                <span>Next</span>
                                <AiOutlineRight />
                            </Button>
                        </div>
                    </Wrapper>
                </div>
            </main>
        </Layout>
    );
}
