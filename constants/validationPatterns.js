export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/; // At least 4 characters, letters, and numbers
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{4,}$/; // At least 4 characters, including lowercase, uppercase, number, special character
