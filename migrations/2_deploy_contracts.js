var Freelance = artifacts.require("./Freelance.sol");

module.exports = function(deployer) {
  deployer.deploy(Freelance);
};