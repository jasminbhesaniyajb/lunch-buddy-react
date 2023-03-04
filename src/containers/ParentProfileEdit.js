import {connect} from 'react-redux'
import ParentProfileEdit from '../components/ParentProfiles'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const ParentProfileEditComponent =  connect(mapStateToProps,mapDispatchToProps)(ParentProfileEdit)
export default ParentProfileEditComponent;