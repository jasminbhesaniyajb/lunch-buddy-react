import {connect} from 'react-redux'
import EventOrderDetails from '../components/RestaurantEventOrderDetails'
import {eventOrderDetailsInfo,eventIdgradeIdInfo} from '../redux/actions/eventOrderDetailsAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addEventOrderDetailsHandler:(data)=>dispatch(eventOrderDetailsInfo(data)),
    addEventIdgradeIdHandler:(data)=>dispatch(eventIdgradeIdInfo(data))
})
const EventOrderDetailsComponent =  connect(mapStateToProps,mapDispatchToProps)(EventOrderDetails)
export default EventOrderDetailsComponent;