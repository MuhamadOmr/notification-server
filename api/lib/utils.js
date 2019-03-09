const Validators = {};

//Validate mongo ID
Validators.validMongoID = function(mongoId) {
  const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
  return checkForHexRegExp.test(mongoId);
};

module.exports = {
  validators: Validators,
};
