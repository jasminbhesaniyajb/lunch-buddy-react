import {connect} from 'react-redux'
import RestaurantManageMenu from '../views/restaurant/manage-menu/Index'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const RestaurantManageMenuComponent =  connect(mapStateToProps,mapDispatchToProps)(RestaurantManageMenu)
export default RestaurantManageMenuComponent;