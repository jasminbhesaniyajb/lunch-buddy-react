import {
    HOME_ORDER_NOW_INFO,
    HOME_ORDER_NOW_EVENT_INFO
} from "../types";  
  
export const homeOrderNowInfo = (data) => (
    //console.log("action",data),
    {        
    type: HOME_ORDER_NOW_INFO,
    data: data,
});
export const homeOrderNowEventInfo = (data) => (
    {        
    type: HOME_ORDER_NOW_EVENT_INFO,
    data: data,
});
  
 
  
 
 
  
  
  