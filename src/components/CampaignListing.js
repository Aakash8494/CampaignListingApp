
const CampaignListing = (props)=>{

    const table_data = props.table_data;
    const table_headings = props.table_headings;

    return(
        <table>
            <thead>
                <tr>
                    {table_headings.map((header)=>{
                        return(<th>{header}</th>);
                    })}
                </tr>
            </thead>
            <tbody>
                {table_data.map((campaign)=>{
                    return (
                        <tr>
                            <td>{campaign.name}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>

    );

}

export default CampaignListing;