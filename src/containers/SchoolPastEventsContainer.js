import {connect} from 'react-redux'
import PastEvent from '../views/school/past-event/Index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const PastEventComponent =  connect(mapStateToProps,mapDispatchToProps)(PastEvent)
export default PastEventComponent;