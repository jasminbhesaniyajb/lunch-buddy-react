import {connect} from 'react-redux'
import AddGradeDivisionModal from '../components/AddGradeDivisionModal'
import {addLoginInfo} from '../redux/actions/userInfoAction'

const mapStateToProps=state=>({
    data:state.loginInfo
})
const mapDispatchToProps=dispatch=>({
    addMainLoginInfoHandler:(data)=>dispatch(addLoginInfo(data))
})
const AddGradeDivisionModalComponent =  connect(mapStateToProps,mapDispatchToProps)(AddGradeDivisionModal)
export default AddGradeDivisionModalComponent;