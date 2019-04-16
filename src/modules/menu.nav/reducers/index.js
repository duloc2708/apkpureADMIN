const INITIAL_STATE = {
    listMenuUser: [
        { routes: '/post', key: 'post', text: 'Post', icon: 'fas fa-fw fa-tachometer-alt' },
        // { routes: '/blog', key: 'blog', text: 'Blog', icon: 'fas fa-fw fa-tachometer-alt' },
        { routes: '/video', key: 'video', text: 'Collection', icon: 'fas fa-video' },
        { routes: '/leecher', key: 'leecher', text: 'Leecher game', icon: 'fas fa-link' },
    ],
    listMenuAdmin: [
        { routes: '/post', key: 'post', text: 'Post', icon: 'fas fa-fw fa-tachometer-alt' },
        // { routes: '/blog', key: 'blog', text: 'Blog', icon: 'fas fa-fw fa-tachometer-alt' },
        { routes: '/video', key: 'video', text: 'Collection', icon: 'fas fa-video' },
        { routes: '/listtype', key: 'listtype', text: 'Chuyên mục', icon: 'fas fa-fw fa-chart-area' },
        { routes: '/leecher', key: 'leecher', text: 'Leecher game', icon: 'fas fa-link' },
        { routes: '/users', key: 'users', text: 'Quản lý users', icon: 'fas fa-user' },
        { routes: '/pageservice', key: 'pageservice', text: 'Page service', icon: 'fas fa-user-cog' }
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