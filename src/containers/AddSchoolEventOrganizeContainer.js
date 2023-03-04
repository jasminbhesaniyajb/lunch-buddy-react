import {connect} from 'react-redux'
import AddSchoolEventOrganize from '../views/school/organize/Index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const AddSchoolEventOrganizeComponent =  connect(mapStateToProps,mapDispatchToProps)(AddSchoolEventOrganize)
export default AddSchoolEventOrganizeComponent;