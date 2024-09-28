export const messages = {
    auth: {
        emailExists: 'Email already exists',
        usernameExists: 'Username already exist',
        invalidCredentials: 'Invalid credentials',
        authDenied: 'Authorization denied',
        tokenNotValid: 'Token is not valid',
    },
    validation: {
        username: 'Username must be at least 4 characters long and include both letters and numbers.',
        email: 'Invalid email format.',
        password: 'Password must be at least 4 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.'
    },
    quotation: {
        notExists: 'No quotations found for this user.',
    },
    pdf: {
        notFound: 'PDF not found',
        generated: 'PDF Generated',
    },
    server: {
        error: 'Server error, please try again later',
    },
    config: {
        dbConnected: 'MongoDB Connected',
    },
};
