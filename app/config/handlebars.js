module.exports = {
    ifEquals: function(first, second, options) {
        return (first == second) ? options.fn(this) : options.inverse(this);
    }
}