import {connect} from 'react-redux'
import SchoolOrganizeEvent from '../views/school/organize-event/Index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const SchoolOrganizeEventComponent =  connect(mapStateToProps,mapDispatchToProps)(SchoolOrganizeEvent)
export default SchoolOrganizeEventComponent;