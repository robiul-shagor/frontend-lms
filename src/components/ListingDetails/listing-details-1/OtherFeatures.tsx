import { IoHomeOutline, IoLayersOutline, IoShirtOutline } from "react-icons/io5";

const OtherFeatures = ({ propertyData }:any) => {
    const featuresData = [
        { label: 'Total rooms', value: propertyData?.RoomsTotal || '-', icon: <IoHomeOutline className="text-secondary" />, labelFontSize: '16px', valueFontSize: '14px' },
        { label: 'Exterior', value: '-', icon: <IoLayersOutline className="text-secondary" />, labelFontSize: '16px', valueFontSize: '14px' },
        { label: 'Laundry level', value: '-', icon: <IoShirtOutline className="text-secondary" />, labelFontSize: '16px', valueFontSize: '14px' },
    ];

    return (
        <div className="mt-20" style={{width:'fit-content'}}>
            <p className="fw-semibold text-dark fs-20 border-bottom border-1 border-dark" >Other features</p>
            <div style={{ width: 'fit-content' }} className="d-flex mt-10 gap-3 flex-wrap align-items-start bg-white p-3 rounded-4 justify-content-between">
                {featuresData.map((feature, index) => (
                    <div key={index} className="d-flex flex-column align-items-center border-end border-1 pe-3 border-dark">
                        <p style={{ fontSize: feature.labelFontSize }} className="fw-medium m-0 text-dark d-flex align-items-center gap-1">
                            {feature.icon} {feature.label}
                        </p>
                        <p style={{ fontSize: feature.valueFontSize }} className="text-dark m-0">{feature.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OtherFeatures;
