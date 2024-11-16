import React, { useState } from 'react';
import { CgMathMinus } from 'react-icons/cg';
import { FiPlus } from 'react-icons/fi';
import { IoIosBed } from "react-icons/io";

const GarageParkings = ({ propertyData }: any) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const garageData = [
        { label: 'Class', value: propertyData?.PropertyType || '-', labelFontSize: '16px', valueFontSize: '14px' },
        { label: 'Zoning', value: propertyData?.Zoning || '-', labelFontSize: '16px', valueFontSize: '14px' },
        // { label: 'Garage Parkings', value: propertyData?.GarageParkingSpaces || '-', labelFontSize: '16px', valueFontSize: '14px' },
        { label: 'Locker', value: propertyData?.Locker || '-', labelFontSize: '16px', valueFontSize: '14px' },
        { label: 'Building Name', value: propertyData?.BuildingName || '-', labelFontSize: '16px', valueFontSize: '14px' },
        { label: 'Pets', value: propertyData?.PetsAllowed?.join(", ") || '-', labelFontSize: '16px', valueFontSize: '14px' },
    ];

    return (
        <div className="mt-10">
            <div  onClick={toggleExpand} className="d-flex cursor-pointer justify-content-between align-items-center">
                <p className="fw-semibold text-dark fs-20">Other</p>
                <button
                    className="bg-black text-white p-2 rounded-full"
                   
                >
                    {isExpanded ? (
                        <CgMathMinus className="text-xl text-white" />
                    ) : (
                        <FiPlus className="text-xl text-white" />
                    )}
                </button>
            </div>
            <div
                className="overflow-hidden transition-all duration-300"
                style={{
                    maxHeight: isExpanded ? '300px' : '0',
                    // opacity: isExpanded ? '1' : '0',
                }}
            >
                <div className="d-flex mt-3 gap-3 flex-wrap align-items-start rounded-4 bg-white p-3 rounded-2 justify-between">
                    {garageData.map((garage, index) => (
                        <div key={index} className="d-flex flex-column align-items-center">
                            <p style={{ fontSize: garage.labelFontSize }} className="fw-medium m-0 text-dark d-flex align-items-center gap-1">
                                <IoIosBed className="text-secondary" /> {garage.label}
                            </p>
                            <p style={{ fontSize: garage.valueFontSize }} className="m-0">{garage.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GarageParkings;
