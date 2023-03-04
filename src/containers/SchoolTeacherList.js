import {connect} from 'react-redux'
import SchoolTeacherList from '../components/TeacherList'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const SchoolTeacherListComponent =  connect(mapStateToProps,mapDispatchToProps)(SchoolTeacherList)
export default SchoolTeacherListComponent;