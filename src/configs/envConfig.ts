
export const envConfig = {
    isDev : true,
    apiHeads:{
        dev:'http://localhost:3000',
        prod:'http://localhost:3000',
    }
}

export const ApiHead = envConfig.isDev ? envConfig.apiHeads.dev : envConfig.apiHeads.prod

export const ApiCollection = {
    auth:{
        login:'/auth/login',
        register:'/auth/register',
        logout:'/auth/logout',
        forgotPassword:'/auth/forgot-password',
        resetPassword:'/auth/reset-password',
    },
    user:{
        getUser:'/user',
        updateUser:'/user',
        deleteUser:'/user',
    },
}