/**
 * Generate a random string of the given length
 * @param length of the string
 */
export function generateRandomString(length: number) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}
