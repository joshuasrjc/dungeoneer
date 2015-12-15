var Component = require("./ComponentFactory.js").Component
var Matter = require("./matter.js");

function PhysicsBody()
{
  var self = this;

  self.position = {x:0, y:0};
  self.dimensions = {w: 27, h:27};

  self.init = function()
  {
    var x = self.position.x;
    var y = self.position.y;
    var w = self.dimensions.w;
    var h = self.dimensions.h;
    self.body = Matter.Bodies.rectangle(x, y, w, h);
  };

  self.start = function(scene)
  {
    scene.addBodies([self.body]);
  };

  self.update = function(scene)
  {

  };

  self.stop = function(scene)
  {

  };
}

PhysicsBody.prototype = Component;

exports.PhysicsBody = PhysicsBody;
