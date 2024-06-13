export const USER_RESPONSE_MESSAGE = {
    CREATE: {
        SUCCESS: 'Create User Successfully !!!',
        SERVER_ERROR: 'Some thing went wrong, try again.',
        CONFLICT: 'Username is existed.',
        PHONE_CONFLICT: 'Phone number is has been registered.',
        EMAIL_CONFLICT: 'This email has been registered.',
    },
    EDIT: {
        SUCCESS: 'Edit User Successfully !!!',
        PASSWORD_SUCCESS: 'Change Password Successfully !!!',
    },
}

export const AUTH_RESPONSE_MESSAGE = {
    LOGIN: {
        BAD_REQUEST: 'Username or password incorrect, please try again.',
        SERVER_ERROR: 'Somethings went wrong, please try again.',
    },
}


export const SERVER_MESSAGE = {
    NOT_STARTED: 'Server is not starting now.'
}