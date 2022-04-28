import { ActionTypes } from "../constants/action-types";
import CampaignData from "../../campaign_data/campaign_data.json"
import moment from 'moment';

const intialState = [];

const todays_date = moment();
//console.log("todays_date:",todays_date)



export const campaignReducer = (state = intialState, {type, payload_filter_data}) => {
  
  switch (type) {

    case ActionTypes.GET_CAMPAIGNS:
        console.log("GET_CAMPAIGNS:")
    
        //console.log("payload_filter_data->",payload_filter_data);
    
        var payload = payload_filter_data["payload"];
        var filter_data = payload_filter_data["filter_data"];

        //console.log("payload->",payload)
        //console.log("filter_data->",filter_data)

        let state_new =  CampaignData.map((campaign_current)=>{
        
            let index = payload.findIndex((curr)=>curr.id === campaign_current.userId);
            let UserName = (index === -1)?"Unknown user":payload[index].name;

            // campaign_current.startDate

            // campaign_current.endDate

            let ActiveStatus

            // console.log("todays_date:",todays_date)
            // console.log("startDate:",moment(campaign_current.startDate))
            // console.log("endDate:",moment(campaign_current.endDate))

            if(moment(campaign_current.startDate).isBefore(todays_date)&&
            moment(campaign_current.endDate).isAfter(todays_date)){
                ActiveStatus = "Active";
            }else{
                ActiveStatus = "InActive";
            }



            return {...campaign_current, UserName, ActiveStatus}

        });



        var filtered_state = state_new.filter((campaign_current)=>{

            if(
                (
                    (filter_data.start_date1!=="" && filter_data.end_date1===""&&
                    moment(filter_data.start_date1).isAfter(moment(campaign_current.startDate)) &&
                    moment(filter_data.start_date1).isBefore(moment(campaign_current.endDate)) 
                    ) ||
                    (filter_data.start_date1==="" && filter_data.end_date1!==""&&
                    moment(filter_data.end_date1).isAfter(moment(campaign_current.startDate)) &&
                    moment(filter_data.end_date1).isBefore(moment(campaign_current.endDate))
                    ) ||
                    (
                        filter_data.start_date1!=="" && filter_data.end_date1!==""&&
                    (
                        (
                        moment(campaign_current.startDate).isAfter(moment(filter_data.start_date1)) &&
                        moment(campaign_current.startDate).isBefore(moment(filter_data.end_date1)) )
                        ||

                        (moment(campaign_current.endDate).isAfter(moment(filter_data.start_date1)) &&
                        moment(campaign_current.endDate).isBefore(moment(filter_data.end_date1)))
                        ||

                        (moment(campaign_current.startDate).isBefore(moment(filter_data.start_date1)) &&
                        moment(campaign_current.endDate).isAfter(moment(filter_data.end_date1)))

                        )
                    ) ||
                    (filter_data.start_date1==="" && filter_data.end_date1==="")
                    // ||
                    // (filter_data.start_date1!=="" && filter_data.end_date1!==""&&
                    // moment(filter_data.start_date1).isAfter(moment(campaign_current.startDate,"mm dd yyyy")) &&
                    // moment(filter_data.start_date1).isBefore(moment(campaign_current.endDate,"mm dd yyyy")) &&
                    // moment(filter_data.end_date1).isAfter(moment(campaign_current.startDate,"mm dd yyyy")) &&
                    // moment(filter_data.end_date1).isBefore(moment(campaign_current.endDate,"mm dd yyyy")) &&
                    // ) ||
                    
                )
                &&
                (
                    (campaign_current.name+"").toLowerCase().includes((filter_data.name1+"").toLowerCase()) || 
                    (campaign_current.UserName+"").toLowerCase().includes((filter_data.name1+"").toLowerCase())
                )
            ){
                return true;
            }
            return false;
  
        }) 

        //console.log("filtered_state.length->"+filtered_state.length)

        if(filtered_state.length === 0){
            return [{id:1,name:"No Records Found"}];
        }else {
            return filtered_state;
        }

        

    default:
      return state;
  }
};