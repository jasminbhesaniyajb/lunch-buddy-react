import {connect} from 'react-redux'
import SchoolProfileEdit from '../components/SchoolProfiles'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const SchoolProfileEditComponent =  connect(mapStateToProps,mapDispatchToProps)(SchoolProfileEdit)
export default SchoolProfileEditComponent;