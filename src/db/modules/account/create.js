const { v4: uuid4 } = require("uuid");
const Account = require("../../models/account");
const hashPassword = require("../password/hash");

module.exports = async ({
    username, email, password, role, quota,
}) => {
    try {
        const account = new Account({
            id: uuid4(),
            username,
            password: hashPassword(password),
            email,
            role,
            secret: null,
            links: {
                count: 0,
                quota,
            },
            allowAutomaticLogin: false,
            twoFactorAuthentication: {
                enabled: false,
                totp: {
                    secret: "",
                    verified: false,
                },
            },
        });

        await account.save();

        return [account, null];
    } catch (e) {
        console.log(e);
        return [null, true];
    }
};
