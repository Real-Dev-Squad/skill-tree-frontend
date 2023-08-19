import Image from "next/image";

type VotesTypes = {
    src: string;
    name: string;
    date: string;
    description: string;
};

export default function Votes({ src, name, date, description }: VotesTypes) {
    return (
        <div className="grid grid-cols-[auto_minmax(0,_1fr)] items-start gap-4 p-4 border-b-2 border-gray-600">
            <div>
                <Image src={src} alt={name} height={40} width={40} />
            </div>
            <div className="text-base">
                <div>
                    <h3 className="font-semibold">{name}</h3>
                    <p className="font-medium mt-1 text-xs text-gray-800">{date}</p>
                </div>
                <div className="mt-2">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}