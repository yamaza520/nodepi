'use strict';

module.exports = function() {
  var privates = {
    _message : 'mes',

    out : function() {
      console.log(this._message);
    },
    in : function(mes) {
      this._message = mes;
    }
  };

  this.setMessage = function(mes) {
    privates.in(mes);
  };
  this.getMessage = function() {
    privates.out();
  };
};
