IdFactory = function() {
    var self = this;
    self.create = function() {
        return Math.random();
    };
};
exports.IdFactory = IdFactory;