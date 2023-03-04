import {connect} from 'react-redux'
import RestaurantViewGradeOrders from '../components/RestaurantViewGradeOrders'

const mapStateToProps=state=>({
    data:state.eventOrderDetailsInfo,
    eventIdgradeIdInfo:state.eventIdgradeIdInfo,
})
const mapDispatchToProps=dispatch=>({
    
})
const RestaurantViewGradeOrdersComponent =  connect(mapStateToProps,mapDispatchToProps)(RestaurantViewGradeOrders)
export default RestaurantViewGradeOrdersComponent;