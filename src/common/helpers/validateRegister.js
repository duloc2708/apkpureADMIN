const { I18n } = ReactReduxI18n || {}
export default (data) => {
    let errorFrom = {}

    if (data.hasOwnProperty('username')) {
        data.username = data.username.toUpperCase()
        const regString = /^[A-Z]/
        const regIsNumber = /\d/
        if (data.username.length == 0)
            errorFrom.username = I18n.t("header.login.register.validate.required")
        else if (!regString.test(data.username))
            errorFrom.username = I18n.t("header.login.register.validate.firt_username")
        else if (data.username.length < 5 || data.username.length > 14)
            errorFrom.username = I18n.t("header.login.register.validate.username_max")
        else if (!regIsNumber.test(data.username))
            errorFrom.username = I18n.t("header.login.register.validate.is_num")
        else if (_.includes(data.username, 'SUPERADMIN')
            || _.includes(data.username, 'ADMIN')
            || _.includes(data.username, 'SUPER')
            || _.includes(data.username, 'MASTER')
            || _.includes(data.username, 'AGENT'))
            errorFrom.username = I18n.t("header.login.register.validate.not_username")
    }

    if (data.hasOwnProperty('email')) {
        const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (data.email.length == 0)
            errorFrom.email = I18n.t("header.login.register.validate.required")
        else if (!regEmail.test(data.email))
            errorFrom.email = I18n.t("header.login.register.validate.email")
    }

    if (data.hasOwnProperty('phone')) {
        const regNumber = /^[0-9]+$/
        if (data.phone.length > 0 && !regNumber.test(data.phone))
            errorFrom.phone = I18n.t("header.login.register.validate.phone")
        else if (data.phone.length > 0 && (data.phone.length < 10 || data.phone.length > 13))
            errorFrom.phone = I18n.t("header.login.register.validate.phone_min_max")
    }

    if (data.hasOwnProperty('password')) {
        if (data.password.length == 0)
            errorFrom.password = I18n.t("header.login.register.validate.required")
        else if (data.password.length < 6 || data.password.length > 20)
            errorFrom.password = I18n.t("header.login.register.validate.password_min_max")
    }

    if (data.hasOwnProperty('current_password')) {
        if (data.current_password.length == 0)
            errorFrom.current_password = I18n.t("account.validateChangePass.required")
        else if (data.current_password.length < 6 || data.current_password.length > 20)
            errorFrom.current_password = I18n.t("account.validateChangePass.current_password_min_max")
    }

    if (data.hasOwnProperty('new_password')) {
        if (data.new_password.length == 0)
            errorFrom.new_password = I18n.t("account.validateChangePass.required")
        else if (data.new_password.length < 6 || data.new_password.length > 20)
            errorFrom.new_password = I18n.t("account.validateChangePass.new_password_min_max")
    }

    if (data.hasOwnProperty('confirm_new_password')) {
        if (data.confirm_new_password.length == 0)
            errorFrom.confirm_new_password = I18n.t("account.validateChangePass.required")
        else if (data.confirm_new_password != data.new_password)
            errorFrom.confirm_new_password = I18n.t("account.validateChangePass.confirm_new_pass_not_match")
    }

    if (data.hasOwnProperty('re_password')) {
        if (data.re_password.length == 0)
            errorFrom.re_password = I18n.t("header.login.register.validate.required")
        else if (data.password != data.re_password)
            errorFrom.re_password = I18n.t("header.login.register.validate.re_passeord_not_match")
    }

    if (data.hasOwnProperty('banknumber')) {
        const regNumber = /^[0-9]+$/
        if (data.banknumber.length == 0)
            errorFrom.banknumber = I18n.t("header.login.register.validate.required")
        else if (!regNumber.test(data.banknumber))
            errorFrom.banknumber = I18n.t("header.login.register.validate.bank_account_number")
        else if (data.banknumber.length < 8 || data.banknumber.length > 20)
            errorFrom.banknumber = I18n.t("header.login.register.validate.bank_account_number_min_max")
    }

    if (data.hasOwnProperty('bankname')) {
        if (data.bankname.length == 0)
            errorFrom.bankname = I18n.t("header.login.register.validate.required")
    }

    if (data.hasOwnProperty('holdername')) {
        const regHoldername = /^[a-zA-Z\s]+$/
        if (data.holdername.length == 0)
            errorFrom.holdername = I18n.t("header.login.register.validate.required")
        else if (!regHoldername.test(data.holdername))
            errorFrom.holdername = I18n.t("header.login.register.validate.holder")
    }

    if (data.hasOwnProperty('referralcode')) {
        if (data.referralcode.length > 20)
            errorFrom.referralcode = I18n.t("header.login.register.validate.referralcode")
    }

    if (data.hasOwnProperty('is_register')) {
        if (!data.is_register)
            errorFrom.is_register = true
    }

    return errorFrom
}