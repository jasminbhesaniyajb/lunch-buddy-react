import {connect} from 'react-redux'
import AdminProfile from '../views/admin/profile/Index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    
})
const AdminProfileComponent =  connect(mapStateToProps,mapDispatchToProps)(AdminProfile)
export default AdminProfileComponent;