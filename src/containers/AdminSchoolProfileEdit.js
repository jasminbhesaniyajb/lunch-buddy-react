import {connect} from 'react-redux'
import AdminSchoolProfileEdit from '../components/SchoolProfiles'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const AdminSchoolProfileEditComponent =  connect(mapStateToProps,mapDispatchToProps)(AdminSchoolProfileEdit)
export default AdminSchoolProfileEditComponent;