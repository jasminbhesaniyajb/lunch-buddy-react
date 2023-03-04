import {connect} from 'react-redux'
import AdminRestaurantProfileEdit from '../components/RestaurantProfiles'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const AdminRestaurantProfileEditComponent =  connect(mapStateToProps,mapDispatchToProps)(AdminRestaurantProfileEdit)
export default AdminRestaurantProfileEditComponent;