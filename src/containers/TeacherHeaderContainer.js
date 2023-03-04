import {connect} from 'react-redux'
import TeacherHorizontalHeader from '../components/teacher/HorizontalHeader'
import {addCartInfo} from '../redux/actions/cartAction'

const mapStateToProps=state=>({
    data:state.loginInfo,
    cart:state.cartInfo,
})
const mapDispatchToProps=dispatch=>({
    addCartInfoHandler:(data)=>dispatch(addCartInfo(data))
})
const TeacherHorizontalHeaderComponent =  connect(mapStateToProps,mapDispatchToProps)(TeacherHorizontalHeader)
export default TeacherHorizontalHeaderComponent;