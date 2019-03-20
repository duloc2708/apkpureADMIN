const INITIAL_STATE = {
    listMenu: [
        { routes: '/blog', key: 'blog', text: 'Blog', icon: 'fas fa-fw fa-tachometer-alt' },
        { routes: '/listtype', key: 'listtype', text: 'Chuyên mục', icon: 'fas fa-fw fa-chart-area' },
        { routes: '/leecher', key: 'leecher', text: 'Leecher game', icon: 'fas fa-link' }

    ]
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
            break;
    }
}
export default Reducer