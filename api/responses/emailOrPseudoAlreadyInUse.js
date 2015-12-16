/**
 *
 * Usage:
 *
 * ````
 * res.emailAddressInUse();
 * ```
 */

module.exports = function emailOrPseudoAlreadyInUse(errEmail,errPseudo) {

  // Get access to `res`
  // (since the arguments are up to us)
  var res = this.res;
  var req = this.req;

  return res.send(409, {errEmail: errEmail,errPseudo: errPseudo}) ;

};
