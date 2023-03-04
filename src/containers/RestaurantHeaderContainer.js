import {connect} from 'react-redux'
import RestaurantHorizontalHeader from '../components/restaurant/HorizontalHeader'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const RestaurantHorizontalHeaderComponent =  connect(mapStateToProps,mapDispatchToProps)(RestaurantHorizontalHeader)
export default RestaurantHorizontalHeaderComponent;