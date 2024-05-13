module.exports = ({
    id, username, email, role, quota, secret, twoFactorAuthentication: { enabled: twoFactorAuthentication, totp: { verified: totp } }, allowAutomaticLogin,
}) => ({
    id,
    username,
    email,
    role,
    quota,
    secret,
    twoFactorAuthentication,
    totp,
    allowAutomaticLogin,
});
