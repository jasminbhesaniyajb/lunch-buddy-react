import {connect} from 'react-redux'
import ParentCartDetails from '../components/Cart'
import {addCartInfo} from '../redux/actions/cartAction'

const mapStateToProps=state=>({
    data:state.loginInfo,
    cart:state.cartInfo,
})
const mapDispatchToProps=dispatch=>({
    addCartInfoHandler:(data)=>dispatch(addCartInfo(data))
})
const ParentCartDetailsComponent =  connect(mapStateToProps,mapDispatchToProps)(ParentCartDetails)
export default ParentCartDetailsComponent;