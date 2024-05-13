module.exports = (q) => {
    let quota = q;

    if (quota === undefined) return true; // allow unlimited counts

    if (typeof quota !== "number") {
        quota = parseInt(q, 10);
    }

    if (Number.isNaN(quota)) return false;

    if (quota < 0) return false;

    if (quota > Number.MAX_SAFE_INTEGER) return false;

    return true;
};
