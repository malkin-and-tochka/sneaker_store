import authManager from "./axiosManagers/authManager";

export const getAccountData = async () => {
    try {
        const res = await authManager.get('/account')
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const getAccountRoles = async () => {
    try {
        const res = await authManager.get('/account/roles')
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export const updateAccountData = async (firstName, lastName, mobilePhone) => {
    try {
        const res = await authManager.put('/account/update', {firstName, lastName, mobilePhone})
        return res.data
    } catch (e) {
        console.log(e.response.data)
        return e.response.data
    }
}
