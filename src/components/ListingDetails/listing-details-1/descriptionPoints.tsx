import { IoIosBed } from "react-icons/io";

const DesciptionPoints = ({ propertyData }: any) => {
    const propertyDetails = [
        { label: 'MLS#', value: propertyData?.LotSizeRangeAcres || '-', fontSize: '14px' },
        { label: 'Listed On', value: propertyData?.ListingContractDate || '-', fontSize: '14px' },
        { label: 'Last updated', value: '-', fontSize: '14px' },
        { label: 'Possession date', value: '-', fontSize: '14px' },
        { label: 'Property taxes', value: propertyData?.TaxAnnualAmount || '-', fontSize: '14px' },
    ];

    return (
        <div className="d-flex mt-10 flex-wrap gap-3 rounded-4 align-items-start bg-white p-3 rounded-2 justify-content-between">
            {propertyDetails.map((detail, index) => (
                <div key={index} className="d-flex flex-column  align-items-center border-end border-1 border-dark pe-3">
                    <p style={{ fontSize: '16px' }} className="fw-medium m-0 text-dark d-flex align-items-center gap-1">
                        <IoIosBed className="text-secondary" /> {detail.label}
                    </p>
                    <p style={{ fontSize: '14px' }} className="text-dark m-0">{detail.value}</p>
                </div>
            ))}
        </div>
    );
};

export default DesciptionPoints;
