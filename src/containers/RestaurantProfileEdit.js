import {connect} from 'react-redux'
import RestaurantProfileEdit from '../components/RestaurantProfiles'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const RestaurantProfileEditComponent =  connect(mapStateToProps,mapDispatchToProps)(RestaurantProfileEdit)
export default RestaurantProfileEditComponent;