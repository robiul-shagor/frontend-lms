'use client';
import React, { useState, useRef, useEffect } from 'react';

interface OptionGroup {
    heading?: string;
    options: string[];
}

interface CustomDropdownProps {
    options: (string | OptionGroup)[];
    placeholder?: string;
    style?: string;
    width?: string;
    onSelect?: (selectedValue: string) => void; // Callback for when an option is selected
    value?: string; // Initial value
    arrow?:boolean
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    options,
    placeholder = 'Select',
    style = '',
    width,
    onSelect,
    value,
    arrow = true
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(value || null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close the dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onSelect) {
            onSelect(option); // Trigger callback
        }
    };

    return (
        <div ref={dropdownRef} className={`relative ${width}`}>
            {/* Dropdown header */}
            <div
                onClick={() => setIsOpen((prev) => !prev)}
                className={`flex  items-center  cursor-pointer ${style}`}
            >
                <span className='text-[14px]' >{selectedOption || placeholder}</span>
                {
                    arrow &&
                    <span className={`transform transition-transform ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
                    {/* Custom SVG for arrow */}
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill="#7A5CFA" />
                    </svg>
                </span>
                }
            </div>

            {/* Dropdown options */}
            {isOpen && (
                <ul className="absolute mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-full">
                    {options.map((option, index) => {
                        // Check if option is a group or a simple string
                        if (typeof option === 'string') {
                            return (
                                <li
                                    key={index}
                                    onClick={() => handleOptionClick(option)}
                                    className="px-4 py-2 hover:bg-[#7A5CFA] hover:text-white text-sm cursor-pointer whitespace-nowrap"
                                >
                                    {option}
                                </li>
                            );
                        } else {
                            // Render group heading and options
                            return (
                                <div key={index}>
                                    {option.heading && (
                                        <li className="px-4 py-2 font-bold bg-gray-100 cursor-default whitespace-nowrap">
                                            {option.heading}
                                        </li>
                                    )}
                                    {option.options.map((subOption, subIndex) => (
                                        <li
                                            key={`${index}-${subIndex}`}
                                            onClick={() => handleOptionClick(subOption)}
                                            className="px-4 py-2 hover:bg-[#7A5CFA] hover:text-white text-sm cursor-pointer whitespace-nowrap"
                                        >
                                            {subOption}
                                        </li>
                                    ))}
                                </div>
                            );
                        }
                    })}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
