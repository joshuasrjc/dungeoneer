var PIXI = require("pixi.js");
var Component = require("./ComponentFactory.js").Component;

function GameSprite()
{
  var self = this;
  self.imageFile = "";
  self.texture = null;
  self.sprite = null;

  self.init = function()
  {
    self.texture = PIXI.Texture.fromImage("./sprites/" + self.imageFile);
    self.sprite = new PIXI.Sprite(self.texture);
    self.sprite.anchor = {x:0.5, y:0.5};
  }

  self.start = function(scene)
  {
    scene.canvas.addChild(self.sprite);
  }

  self.update = function(scene)
  {
    self.sprite.position = self.gameObject.getComponent("PhysicsBody").body.position;
    console.log(self.sprite.position);
  }

  self.stop = function(scene)
  {

  }
}

GameSprite.prototype = Component;

exports.GameSprite = GameSprite;
