import {connect} from 'react-redux'
import AddEditManageMenu from '../views/restaurant/manage-menu/AddEditMenu'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const AddEditManageMenuComponent =  connect(mapStateToProps,mapDispatchToProps)(AddEditManageMenu)
export default AddEditManageMenuComponent;