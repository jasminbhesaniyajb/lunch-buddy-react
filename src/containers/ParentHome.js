import {connect} from 'react-redux'
import ParentHome from '../views/parent/home/Index'
import {homeOrderNowInfo,homeOrderNowEventInfo} from '../redux/actions/homeOrderNowAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addHomeOrderNowInfoHandler:(data)=>dispatch(homeOrderNowInfo(data)),
    addHomeOrderNowEventInfoHandler:(data)=>dispatch(homeOrderNowEventInfo(data))
})
const ParentHomeComponent =  connect(mapStateToProps,mapDispatchToProps)(ParentHome)
export default ParentHomeComponent;