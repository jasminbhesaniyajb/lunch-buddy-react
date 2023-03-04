import {connect} from 'react-redux'
import VerifyOtp from '../views/public/verify-otp/Index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state
})
const mapDispatchToProps=dispatch=>({
    addLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))

})
const VerifyOtpComponent =  connect(mapStateToProps,mapDispatchToProps)(VerifyOtp)
export default VerifyOtpComponent;