import {connect} from 'react-redux'
import AdminParentProfileEdit from '../components/ParentProfiles'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const AdminParentProfileEditComponent =  connect(mapStateToProps,mapDispatchToProps)(AdminParentProfileEdit)
export default AdminParentProfileEditComponent;