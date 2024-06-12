import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'noti',
    initialState: '',
    reducers: {
        setNoti(state, action) {
            return action.payload
        },
        clearNoti(state) {
            return ''
        }
    }
})

export const showNoti = (noti, timeout) => {
    return async dispatch => {
        dispatch(setNoti(noti))
        setTimeout(() => {
            dispatch(clearNoti())
        }, timeout * 1000)
    }
}

export const { setNoti, clearNoti } = notificationSlice.actions
export default notificationSlice.reducer