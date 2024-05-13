const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    id: String,
    username: String,
    password: String,
    email: String,
    role: String, // owner || admin || standard
    quota: Number, // must be > 0, undefined = unlimited
    secret: String,
    allowAutomaticLogin: Boolean,
    twoFactorAuthentication: {
        enabled: Boolean,
        backupCodes: [String],
        totp: {
            secret: String,
            verified: Boolean,
        },
    },
});

const Account = mongoose.model("Account", schema);

module.exports = Account;
