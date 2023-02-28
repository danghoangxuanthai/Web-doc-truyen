import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Loading from '../../utils/Loading'
import Toast from './Toast'
function Notify() {
    const {auth, alert} = useSelector(state => state)
    const dispatch = useDispatch()
  return (
    <>
        {alert.loading && <Loading />}
        {alert.error && <Toast msg={{title: 'Error', body: alert.error}} handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})} bgColor={'bg-danger'}/>}
        {alert.success && <Toast msg={{title: 'Success', body: alert.success}} handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})} bgColor={"bg-success"} />}
    </>
   
  )
}

export default Notify