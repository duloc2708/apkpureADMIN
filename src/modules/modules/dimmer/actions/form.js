import {
    LOADING,
    LOADED
} from '../types'
export const UIBlock = () => {
    return {
        type: LOADING,
        payload: null
    }
}
export const UIUnblock = () => {
    return {
        type: LOADED,
        payload: null
    }
}
