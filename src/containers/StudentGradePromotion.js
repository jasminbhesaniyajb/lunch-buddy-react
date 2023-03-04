import {connect} from 'react-redux'
import SchoolGradePromotion from '../components/StudentGradePromotion'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const SchoolGradePromotionComponent =  connect(mapStateToProps,mapDispatchToProps)(SchoolGradePromotion)
export default SchoolGradePromotionComponent;