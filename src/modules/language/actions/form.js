import {
    CHANGE_LANG
} from '../types'
import translationObject from 'lang'
export const changeLang = (lang) => {
    return (dispatch) => {
        dispatch(ReactReduxI18n.loadTranslations(translationObject))
        dispatch(ReactReduxI18n.setLocale(lang))
        SportConfig._setCookie('lang', lang)
    }
}