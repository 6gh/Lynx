module.exports = (quota) => {
    if (typeof quota !== "number") return false;

    if (Number.isNaN(quota)) return false;

    if (quota < 0) return false;

    if (quota > Number.MAX_SAFE_INTEGER) return false;

    return true;
};
