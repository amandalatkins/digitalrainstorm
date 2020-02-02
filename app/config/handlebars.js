module.exports = {
    ifEquals: function(first, second, options) {
        return (first == second) ? options.fn(this) : options.inverse(this);
    },
    ifEven: function(index, options) {
        if((index % 2) === 0) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
    }
}