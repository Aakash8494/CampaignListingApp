import fakeUserApi from "../apis/fakeUserApi";
import { ActionTypes } from "../constants/action-types"



export const fetchCampaigns = (filter_data) => async (dispatch) => {

  //console.log("filter_data->"+filter_data["new_campaign_data"]);
  //console.log("filter_data->"+filter_data["filter_data"]);


  const loader = document.querySelector('#loader');
  loader.style.display = 'block'
  const response = await fakeUserApi.get("/users");
  loader.style.display = 'none'
  dispatch({ type: ActionTypes.GET_CAMPAIGNS, 
    payload_filter_data://response.data 
    {payload:response.data,filter_data} 
  });
};