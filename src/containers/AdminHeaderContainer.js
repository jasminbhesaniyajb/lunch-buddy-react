import {connect} from 'react-redux'
import AdminHorizontalHeader from '../components/admin/HorizontalHeader'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const AdminHorizontalHeaderComponent =  connect(mapStateToProps,mapDispatchToProps)(AdminHorizontalHeader)
export default AdminHorizontalHeaderComponent;