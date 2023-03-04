import {connect} from 'react-redux'
import Login from '../views/public/login/index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))

})
const LoginComponent =  connect(mapStateToProps,mapDispatchToProps)(Login)
export default LoginComponent;