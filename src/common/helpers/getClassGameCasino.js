export default (type) => {
    let list_class = [
        { id: 1, class: 'baccarat' },
        { id: 2, class: 'dragonTiger' },
        { id: 3, class: 'roulette' },
        { id: 4, class: 'sicbo' },
        { id: 5, class: '' }
    ]
    let get_class = list_class.filter(x => x.id == type)

    return get_class[0].class
}