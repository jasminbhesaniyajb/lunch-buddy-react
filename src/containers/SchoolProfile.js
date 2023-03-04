import {connect} from 'react-redux'
import SchoolProfile from '../views/school/profile/Index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const SchoolProfileComponent =  connect(mapStateToProps,mapDispatchToProps)(SchoolProfile)
export default SchoolProfileComponent;