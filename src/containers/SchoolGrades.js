import {connect} from 'react-redux'
import SchoolGrades from '../views/school/school-grades/Index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const SchoolGradesComponent =  connect(mapStateToProps,mapDispatchToProps)(SchoolGrades)
export default SchoolGradesComponent;