import {connect} from 'react-redux'
import UpcomingEvent from '../views/restaurant/upcoming-event/Index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const UpcomingEventComponent =  connect(mapStateToProps,mapDispatchToProps)(UpcomingEvent)
export default UpcomingEventComponent;