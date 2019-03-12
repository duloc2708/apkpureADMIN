const INITIAL_STATE = {
    listMenu: [
        { routes: '/blog', key: 'blog', text: 'Blog', icon: 'fas fa-fw fa-tachometer-alt' },
        // { routes: '/video', key: 'video', text: 'Video', icon: 'fas fa-fw fa-chart-area' },
        // { routes: '/uploads', key: 'uploads', text: 'Upload', icon: 'fas fa-upload' },
        { routes: '/listtype', key: 'listtype', text: 'Chuyên mục', icon: 'fas fa-fw fa-chart-area' }
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