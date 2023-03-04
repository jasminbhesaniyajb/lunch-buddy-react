import {connect} from 'react-redux'
import Logout from '../components/LogoutModal'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))

})
const LogoutComponent =  connect(mapStateToProps,mapDispatchToProps)(Logout)
export default LogoutComponent;