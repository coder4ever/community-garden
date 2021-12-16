const MyCommunity = artifacts.require('Community')
module.exports = function (deployer) {
  deployer.deploy(MyCommunity)
}
