"use client"

import React, { useState, Dispatch, SetStateAction } from "react";
import down from "../../../../public/down.svg";
import Image from "next/image";

type Props = {
    question: string;
    answer: string;
    idx: number;
}

interface LayoutProps {
    handleClick: () => void;
    isSomeActive: boolean;
    turn: boolean[];
    setTurn: Dispatch<SetStateAction<boolean[]>>;
    faqs: Props[];
}

const LayoutFaq = ({ handleClick, isSomeActive, faqs: allFaqs, turn, setTurn }: LayoutProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filtra le domande in base alla query di ricerca
    const filteredFaqs = allFaqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='items-center flex flex-col lg:w-7/12 lg:mt-7 w-full my-5 px-4'>
            <span className="text-3xl font-bold mb-6">
                FAQs
            </span>

            {/* Search bar */}
            <div className="mb-6 w-full">
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                    placeholder="Search for a question..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Open all button */}
            <div className='flex items-center w-full mb-6 lg:justify-end'>
                <button onClick={handleClick}
                    className='flex items-center mr-3 space-x-1 text-sm font-bold border-b lg:text-base lg:space-x-2 py-2 px-4 bg-white rounded-lg shadow border border-gray-300 hover:bg-gray-200 transition-all duration-300'>
                    <span className='text-black min-w-fit text-ellipsis'>
                        {!isSomeActive ? "Open All" : "Close All"}
                    </span>
                    <div className={'relative transition-transform ease-in-out duration-300 ' + (isSomeActive ? 'rotate-180' : 'rotate-0')}>
                        <Image src={down} alt="" width={20} height={20} />
                    </div>
                </button>
            </div>

            {/* Faqs list */}
            <div className="w-full">
                {filteredFaqs.map((faq, index) => (
                    <div key={index} className="mb-6">
                        <div className="bg-white p-4 rounded-t-lg shadow border border-gray-300 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-all duration-300" onClick={() => setTurn(turn.map((t, i) => i === index ? !t : t))}>
                            <h3 className="text-lg font-semibold">{faq.question}</h3>
                            <div className={'transition-transform duration-300 ' + (turn[index] ? 'rotate-180' : 'rotate-0')}>
                                <Image src={down} alt="" width={20} height={20} />
                            </div>
                        </div>
                        {turn[index] && <div className="bg-gray-100 p-4 rounded-b-lg shadow border border-gray-300 border-t-0"><p className="mt-2">{faq.answer}</p></div>}
                    </div>
                ))}
                {filteredFaqs.length === 0 && (
                    <p className="text-gray-600">No results found.</p>
                )}
            </div>
        </div>
    );
}

export default LayoutFaq;
