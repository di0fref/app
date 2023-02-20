const users = []

export const addUser = (id, name) => {
    const user = { id, name }
    users.push(user)
    return { user }
}

export const getUser = id => {
    let user = users.find(user => user.id == id)
    return user
}

export const getAllUsers = () => {
    return users;
}

export const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

export const getUsers = (room) => users.filter(user => user.room === room)

