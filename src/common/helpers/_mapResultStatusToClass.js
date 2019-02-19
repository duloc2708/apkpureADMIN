export default (status) => {
    return {
        true: 'ic ic_x',
        false: 'ic ic_sidemenu_result'
    } [status]
}