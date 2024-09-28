export const messages = {
    auth: {
        emailExists: 'Email already exists',
        usernameExists: 'Username already exist',
        userCreated: 'User created successfully',
        invalidCredentials: 'Invalid credentials',
        authDenied: 'Authorization denied',
        tokenNotValid: 'Token is not valid',
    },
    validation: {
        username: 'Username must be at least 4 characters long and include both letters and numbers.',
        email: 'Invalid email format.',
        password: 'Password must be at least 4 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.'
    },
    task: {
        notAuthorized: 'Not authorized',
        taskRemoved: 'Task removed successfully',
        notFound: 'Task not found',
        deleted: 'Task deleted successfully',
    },
    server: {
        error: 'Server error, please try again later',
    },
    config: {
        dbConnected: 'MongoDB Connected',
    },
};
