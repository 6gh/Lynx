module.exports = ({
    id, username, email, role, links, secret, twoFactorAuthentication: { enabled: twoFactorAuthentication, totp: { verified: totp } }, allowAutomaticLogin,
}) => ({
    id,
    username,
    email,
    role,
    links,
    secret,
    twoFactorAuthentication,
    totp,
    allowAutomaticLogin,
});
