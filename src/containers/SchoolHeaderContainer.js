import {connect} from 'react-redux'
import SchoolHorizontalHeader from '../components/school/HorizontalHeader'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const SchoolHorizontalHeaderComponent =  connect(mapStateToProps,mapDispatchToProps)(SchoolHorizontalHeader)
export default SchoolHorizontalHeaderComponent;