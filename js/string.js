const ALPHANUMERICS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

String.prototype.randomAlphanumeric = function() {
    return ALPHANUMERICS[Math.floor(Math.random() * ALPHANUMERICS.length)]
}