import {connect} from 'react-redux'
import TeacherProfile from '../views/teacher/profile/Index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const TeacherProfileComponent =  connect(mapStateToProps,mapDispatchToProps)(TeacherProfile)
export default TeacherProfileComponent;