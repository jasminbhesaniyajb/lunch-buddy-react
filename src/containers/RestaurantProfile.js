import {connect} from 'react-redux'
import RestaurantProfile from '../views/restaurant/profile/Index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const RestaurantProfileComponent =  connect(mapStateToProps,mapDispatchToProps)(RestaurantProfile)
export default RestaurantProfileComponent;