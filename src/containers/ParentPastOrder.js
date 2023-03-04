import {connect} from 'react-redux'
import ParentPastOrder from '../views/parent/past-orders/Index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const ParentPastOrderComponent =  connect(mapStateToProps,mapDispatchToProps)(ParentPastOrder)
export default ParentPastOrderComponent;