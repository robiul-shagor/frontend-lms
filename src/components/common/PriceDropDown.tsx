'use client';
import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
    minOptions: string[];
    maxOptions: string[];
    onSelect?: (min: string | null, max: string | null) => void;
}

const PriceDropDown: React.FC<DropdownProps> = ({ minOptions, maxOptions, onSelect }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedMin, setSelectedMin] = useState<string | null>(null);
    const [selectedMax, setSelectedMax] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close the dropdown if clicked outside
    useEffect(() => {
        // const handleClickOutside = (event: MouseEvent) => {
        //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        //         setIsOpen(false);
        //     }
        // };

        // document.addEventListener('mousedown', handleClickOutside);
        // return () => {
        //     document.removeEventListener('mousedown', handleClickOutside);
        // };
    }, []);

    const handleOptionClick = (type: 'min' | 'max', value: string) => {
        if (type === 'min') {
            setSelectedMin(value);
        } else {
            setSelectedMax(value);
        }

        if (selectedMin && selectedMax) {
            setIsOpen(false);
        }
        
        if (onSelect) {
            onSelect(selectedMin, selectedMax);
        }
    };

    return (
        <div ref={dropdownRef} className="relative ">
            {/* Dropdown header */}
            <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 cursor-pointer h-[40px] w-[95px] "
            >
                <div className="flex justify-between text-[#000] text-[14px]">
                   Price
                </div>
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-full">
                    <div className="flex">
                        {/* Min column */}
                        <div className="w-1/2">
                            <div className="text-center font-semibold py-2 bg-gray-100">Min</div>
                            {minOptions.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleOptionClick('min', option)}
                                    className={`px-4 text-[14px] py-3 cursor-pointer hover:bg-[#7A5CFA] border border-l-0 hover:text-white  ${selectedMin === option ? 'bg-[#7A5CFA] text-white' : ''}`}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>

                        {/* Max column */}
                        <div className="w-1/2">
                            <div className="text-center font-semibold py-2 bg-gray-100">Max</div>
                            {maxOptions.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleOptionClick('max', option)} 
                                    className={`px-4 text-[14px] py-3 cursor-pointer hover:bg-[#7A5CFA] border border-r-0 hover:text-white ${selectedMax === option ? 'bg-[#7A5CFA] text-white' : ''}`}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default PriceDropDown;