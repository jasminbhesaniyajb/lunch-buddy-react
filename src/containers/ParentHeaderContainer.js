import {connect} from 'react-redux'
import ParentHorizontalHeader from '../components/parent/HorizontalHeader'
import {addCartInfo} from '../redux/actions/cartAction'

const mapStateToProps=state=>({
    data:state.loginInfo,
    cart:state.cartInfo,
})
const mapDispatchToProps=dispatch=>({
    addCartInfoHandler:(data)=>dispatch(addCartInfo(data))
})
const ParentHorizontalHeaderComponent =  connect(mapStateToProps,mapDispatchToProps)(ParentHorizontalHeader)
export default ParentHorizontalHeaderComponent;