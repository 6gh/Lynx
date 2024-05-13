const returnAccount = require("../../../../modules/returnAccount");
require("dotenv").config();

module.exports = async ({ account, quota }) => {
    account.quota = quota === 0 ? null : quota;
    await account.save();

    const accountDetails = returnAccount(account);

    return [
        accountDetails,
        null,
    ];
};
