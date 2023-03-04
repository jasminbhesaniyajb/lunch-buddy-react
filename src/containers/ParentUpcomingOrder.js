import {connect} from 'react-redux'
import ParentUpcomingOrder from '../views/parent/upcoming-orders/Index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const ParentUpcomingOrderComponent =  connect(mapStateToProps,mapDispatchToProps)(ParentUpcomingOrder)
export default ParentUpcomingOrderComponent;