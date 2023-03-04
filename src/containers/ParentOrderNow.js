import {connect} from 'react-redux'
import ParentOrderNow from '../components/OrderNow'
import {addCartInfo} from '../redux/actions/cartAction'

const mapStateToProps=state=>({
    data:state.cartInfo,
    homeOrderNowData:state.homeOrderNowInfo,
    loginInfo:state.loginInfo,
})
const mapDispatchToProps=dispatch=>({
    addCartInfoHandler:(data)=>dispatch(addCartInfo(data))
})
const ParentOrderNowComponent =  connect(mapStateToProps,mapDispatchToProps)(ParentOrderNow)
export default ParentOrderNowComponent;