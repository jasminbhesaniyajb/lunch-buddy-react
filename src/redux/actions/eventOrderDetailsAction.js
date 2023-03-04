import {
    EVENT_ORDER_DETAILS_INFO,
    EVENTID_GRADEID_INFO,
} from "../types";  
  
export const eventOrderDetailsInfo = (data) => (
    //console.log("action",data),
    {        
    type: EVENT_ORDER_DETAILS_INFO,
    data: data,
});
export const eventIdgradeIdInfo = (data) => (
    {        
    type: EVENTID_GRADEID_INFO,
    data: data,
});
  
 
  
 
 
  
  
  