import React from "react";
import Drawer from "../drawer/Drawer";
import Tag from "../tag/Tag";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";
import endorsementDetails from "../../../__mocks__/db/endorsementDetails.json";
import EndorsementCard from "../endorsementCard/EndorsementCard";
import Button from "@/components/Button";

type EndorsementDetailsSlideOverProps = {
    endorsementId: string;
    open: Boolean;
    onClose: () => void;
};

const EndorsementDetailsSlideOver = ({ endorsementId, open, onClose }: EndorsementDetailsSlideOverProps) => {
    const data = endorsementDetails.find((end) => end.id === endorsementId);

    return (
        <Drawer open={open} onClose={onClose}>
            <div className="p-6 pt-24 bg-yellow-100">
                <h1 className="mb-4 text-4xl font-semibold lg:text-5xl cursor-pointer">{data?.title}</h1>
                <h3 className="mb-10 text-2xl font-semibold">{data?.date}</h3>
                <h3 className="mb-1 text-2xl font-medium">Skills: {data?.skills}</h3>
                <h6 className="mb-4 text-xl text-gray-700">Endorsers: {data?.endorsers.join(", ")}</h6>
                <Tag>Atomic</Tag>
            </div>

            <div className="p-6 pt-10">
                <h3 className="mb-8 text-2xl font-semibold">Endorsements</h3>

                <ul>
                    {data?.endorsements.map((end) => (
                        <EndorsementCard name={end.name} description={end.description} key={end.id} />
                    ))}
                </ul>
            </div>

            <div className="sticky bottom-0 right-0 grid grid-cols-2 justify-between w-full gap-4 px-6 py-4 bg-blue-100 border border-blue-300 border-solid ">
                <Button variant="success" roundness="medium">
                    <IoCheckmarkSharp />
                    Approve
                </Button>
                <Button variant="error" roundness="medium">
                    <RxCross2 />
                    Reject
                </Button>
            </div>
        </Drawer>
    );
};

export default EndorsementDetailsSlideOver;
