import './App.css';
// import CampaignListing from './components/CampaignListing';
// import CampaignData from './campaign_data/campaign_data.json'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { fetchCampaigns } from './redux/actions/campaignActions';
import moment from 'moment';

function App() {

  const CampaignHeadings = ["Name","User Name","Start Date","End Date","Active","Budget"];
  var i=0,j=0;

  const campaigns = useSelector((state) => state)["campaignReducer"];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
        fetchCampaigns( { start_date1:"",end_date1:"",name1:"",new_campaign_data:"" } )
    );
  }, [dispatch]);

  const start_date = useRef();
  const end_date = useRef();
  const name = useRef();

  const clearFilter = () =>{
    start_date.current.value = "";
    end_date.current.value = "";
    name.current.value = "";

    var start_date1 = start_date.current.value;
    var end_date1 = end_date.current.value;
    var name1 = name.current.value;

    dispatch(fetchCampaigns({start_date1,end_date1,name1,new_campaign_data:""}));
  }

  const handleInput=(e)=>{
    // e.preventDefault();

    //  var name = e.target.name;
    //  var value = e.target.value;

     var start_date1 = start_date.current.value;
     var end_date1 = end_date.current.value;
     var name1 = name.current.value;

    if(start_date1!=="" && end_date1!=="" && ( moment(start_date1).isAfter(moment(end_date1)) ) )
    {
        alert('Check entered period !!!')
        return false
    }
 
     dispatch(fetchCampaigns({start_date1,end_date1,name1,new_campaign_data:""}));
 
     //setFormData({...formData, [name]:value, id : new Date().getTime().toString() });
 }

 const AddCampaigns = (new_campaign_data)=>{
    var start_date1 = start_date.current.value;
    var end_date1 = end_date.current.value;
    var name1 = name.current.value;

    dispatch(fetchCampaigns({start_date1,end_date1,name1,new_campaign_data}));
 }

 window.AddCampaigns = AddCampaigns;

 // Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  
   /* $2,500.00 */
  

  return (
    
      <div className="container_parent">
        
        <div className="container_child">

 
        <div className='filter_title'>Filter Data</div>
        <div className="content-table">

            <div className="container_child">

            <input ref={start_date} id="start_date" name="start_date" type="text" onChange={handleInput} autoComplete='off'
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            placeholder="Select Start Date here..."></input>

            <input ref={end_date} id="end_date" name="end_date" type="text" placeholder="Select End Date here..."
            onChange={handleInput} 
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            autoComplete='off'></input>
            
            <input ref={name} id="name" name="name" type="text" placeholder="Enter Name here..." onChange={handleInput} autoComplete='off'></input>
            <button className="button" onClick={clearFilter}>CLEAR</button>
            </div>

            </div>
       

        <table className="content-table">
            <thead>
                <tr>
                    {CampaignHeadings.map((header)=>{
                        return(<th key={"th"+i++}>{header}</th>);
                    })}
                </tr>
            </thead>
            <tbody>
                <tr id="loader"><td>Loading...</td></tr>
                {campaigns.map((campaign)=>{
                    return (                        
                        <tr key={"list"+j++
                        //new Date().getTime().toString()
                        }>
                            <td >{campaign.name}</td>
                            <td >{campaign.UserName}</td>
                            <td >{campaign.startDate}</td>
                            <td >{campaign.endDate}</td>
                            <td className={ (campaign.ActiveStatus === "Active")?"active-row":""}>{campaign.ActiveStatus}</td>
                            <td >{formatter.format(campaign.Budget)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
      </div>
   
  );
}

export default App;
