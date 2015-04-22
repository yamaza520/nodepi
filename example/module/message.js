'use strict';

// class Hello {
//   var message = "mes";

//   constructor() {
//     console.log("message is  "+ message)
//   }

//   say() {
//     console.log(message);
//   }

//   change(message) {
//     this.message = message;
//   }

// }

// var hello = new Hello();
// hello.say();
// hello.change("atm").say();


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
