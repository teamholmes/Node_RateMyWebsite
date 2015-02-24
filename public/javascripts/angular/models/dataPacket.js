var packetclass = function() {
	this.success = false;
	this.message = "";
	this.data = "";
}

packetclass.prototype.test = function () {
  return "Sucess";
}

module.exports = packetclass;

