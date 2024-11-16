import property_feature_list from "@/data/inner-data/PropertyFeatureListData";

interface FeatureItem {
    title: any;
    count: any; // count can be a string or number
}

interface CommonPropertyFeatureListProps {
    data: {
        BedroomsTotal?: number;
        Furnished?: string;
        BathroomsTotalInteger?: number;
        ApproximateAge?: string;
        GarageParkingSpaces?: number;
        ClearHeightFeet?: number;
        PropertyType?: string;
        ListPriceUnit?: string;
        TaxAnnualAmount?: string;
        Spis?: string;
        DOM?: string;
        Level?: string;
        SharedPercent?: string;
        Unit?: number;
        Locker?: string;
        Corp?: string;
        LockerLevel?: string;
        Zoning?: string;
        PropMgmt?: string;
        Mls?: string;
        Sellers?: string;
        ContactAfterExp?: string;
        Holdover?: string;
        PossessionDate?: string;
        PossessionRemarks?: string;
        Occup?: string;
        StatusCert?: string;
        BldgName?: string;
        PIN?: string;
        ARN?: string;
        Kitchens?: string;
        FamRm?: string;
        Basement?: string;
        FireplaceSt?: string;
        Heat?: string;
        ApxAge?: string;
        ApxSqft?: string;
        SqftSource?: string;
        Exposure?: string;
        Assessment?: string;
        SpecDesig?: string;
        PhysHdp_Eqp?: string;
        PropFeatures?: string;
        PetsPerm?: string;
        Maint?: string;
        A_C?: string;
        CentralVac?: string;
        UFFI?: string;
        Elev_Lift?: string;
        Taxes_Incl?: string;
        Heat_Incl?: string;
        CableTVIncl?: string;
        BldgInsIncl?: string;
        ComElemIncl?: string;
        CertLevel?: string;
        GreenPIS?: string;
        InteriorFeat?: string;
        Balcony?: string;
        EnsLndry?: string;
        LndyLev?: string;
        Exterior?: string;
        GarSpcs?: string;
        ParkDrive?: string;
        ParkType?: string;
        DrvSpcs?: string;
        TotPkSpcs?: string;
        ParkMo?: string;
        PrkLev?: string;
        BldgAmen?: string;
        BedroomsAboveGrade?: string;
    };
}

const CommonPropertyFeatureList = ({ data }: CommonPropertyFeatureListProps) => {
    const feature_list: FeatureItem[] = [
        { title: "Taxes:", count: data?.TaxAnnualAmount },
        { title: "Spis:", count: "-Spis?" },
        { title: "Bedrooms:", count: data?.BedroomsTotal },
        { title: "BedroomsAbove:", count: data?.BedroomsAboveGrade },
        // { title: "BedroomsBelow:", count: data?.BedroomsBelow },
        { title: "Furnishing:", count: data?.Furnished },
        { title: "Bathrooms:", count: data?.BathroomsTotalInteger },
        { title: "Year Built:", count: `Aprx ${data?.ApproximateAge}` },
        { title: "Floor:", count: "Ground -/" },
        { title: "Garage:", count: data?.GarageParkingSpaces },
        { title: "Ceiling Height:", count: `${data?.ClearHeightFeet}m` },
        { title: "Property Type:", count: data?.PropertyType },
        { title: "Renovation:", count: "3.2m -/" },
        { title: "Status:", count: data?.ListPriceUnit },
        {title: "DOM:", count: "-" },
        { title: "Level:", count: "-" },
        { title: "SharedPercent:", count: "-" },
        { title: "Unit:", count: "-" },
        { title: "Locker:", count: "-" },
        { title: "Corp:", count: "-" },
        { title: "LockerLevel:", count: "-" },
        { title: "Zoning:", count: "-" },
        { title: "PropMgmt:", count: "-" },
        { title: "Mls:", count: "-" },
        { title: "Sellers:", count: "-" },
        { title: "ContactAfterExp:", count: "-" },
        { title: "Holdover:", count: "-" },
        { title: "PossessionDate:", count: "-" },
        { title: "PossessionRemarks:", count: "-" },
        { title: "Occup:", count: "-" },
        { title: "StatusCert:", count: "-" },
        { title: "BldgName:", count: "-" },
        { title: "PIN:", count: "-" },
        { title: "ARN:", count: "-" },
        { title: "Kitchens:", count: "-" },
        { title: "FamRm:", count: "-" },
        { title: "Basement:", count: "-" },
        { title: "FireplaceSt:", count: "-" },
        { title: "Heat:", count: "-" },
        { title: "ApxAge:", count: "-" },
        { title: "ApxSqft:", count: "-" },
        { title: "SqftSource:", count: "-" },
        { title: "Exposure:", count: "-" },
        { title: "Assessment:", count: "-" },
        { title: "SpecDesig:", count: "-" },
        { title: "PhysHdp_Eqp:", count: "-" },
        { title: "PropFeatures:", count: "-" },
        { title: "PetsPerm:", count: "-" },
        { title: "Maint:", count: "-" },
        { title: "A_C:", count: "-" },
        { title: "CentralVac:", count: "-" },
        { title: "UFFI:", count: "-" },
        { title: "Elev_Lift:", count: "-" },
        { title: "Taxes_Incl:", count: "-" },
        { title: "Heat_Incl:", count: "-" },
        { title: "CableTVIncl:", count: "-" },
        { title: "BldgInsIncl:", count: "-" },
        { title: "ComElemIncl:", count: "-" },
        { title: "CertLevel:", count: "-" },
        { title: "GreenPIS:", count: "-" },
        { title: "InteriorFeat:", count: "-" },
        { title: "Balcony:", count: "-" },
        { title: "EnsLndry:", count: "-" },
        { title: "LndyLev:", count: "-" },
        { title: "Exterior:", count: "-" },
        { title: "GarSpcs:", count: "-" },
        { title: "ParkDrive:", count: "-" },
        { title: "ParkType:", count: "-" },
        { title: "DrvSpcs:", count: "-" },
        { title: "TotPkSpcs:", count: "-" },
        { title: "ParkMo:", count: "-" },
        { title: "PrkLev:", count: "-" },
        { title: "BldgAmen:", count: "-" }
    ];

    return (
        <div className="accordion" id="accordionTwo">
            {property_feature_list.map((item, index) => (
                <div key={index} className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded={index === 0}
                            aria-controls={`collapse${index}`}
                        >
                            {item.title}
                        </button>
                    </h2>
                    <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                        data-bs-parent="#accordionTwo"
                    >
                        <div className="accordion-body">
                            <div className="feature-list-two">
                                <ul className="style-none d-flex flex-wrap justify-content-between">
                                    {feature_list.map((list, i) => (
                                        <li key={i}>
                                            <span>{list.title} </span>
                                            <span className="fw-500 color-dark">{list.count}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommonPropertyFeatureList;
