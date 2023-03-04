import {connect} from 'react-redux'
import ParentProfile from '../views/parent/profile/Index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const ParentProfileComponent =  connect(mapStateToProps,mapDispatchToProps)(ParentProfile)
export default ParentProfileComponent;