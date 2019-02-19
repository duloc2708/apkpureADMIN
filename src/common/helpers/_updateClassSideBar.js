export default (code) => {
    $(`.main__sidebar ul li`).each(function (index, obj) {
        let idClass = $(this).find('a span i').attr("id")
        let getClassName = SportConfig.list_icon_sidebar.filter(x => x.code == idClass)
        if (idClass && code != idClass && getClassName && getClassName[0]) {
            let icon = getClassName && getClassName[0] && getClassName[0].ic
            $(this).removeClass('active')
            $(this).find('a span i').removeClass('ic_x')
            $(this).find('a span i').addClass(icon)
        }
    });
}