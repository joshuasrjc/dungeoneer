var Component = require("./ComponentFactory.js").Component
var Matter = require("./matter.js");

function Player()
{
  var self = this;
  self.attacking = false;
  self.walkSpeed = 10;

  self.init = function()
  {
    self.input = new Input();
  };

  self.start = function(scene)
  {
    self.physicsBody = self.gameObject.getComponent("PhysicsBody");
  };

  self.update = function(scene, deltaTime)
  {
    var body = self.physicsBody.body;
    var walkForce = { x:0, y:0 };

    scene.viewCenter = body.position;

    if(!self.attacking)
    {
      if(self.input.moveUp)
      {
        walkForce.y -= 1;
      }
      if(self.input.moveDown)
      {
        walkForce.y += 1;
      }
      if(self.input.moveLeft)
      {
        walkForce.x -= 1;
      }
      if(self.input.moveRight)
      {
        walkForce.x += 1;
      }
    }


    var magnitude = Math.sqrt(walkForce.x*walkForce.x + walkForce.y*walkForce.y);
    if(magnitude > 0)
    {
      walkForce.x *= deltaTime * self.walkSpeed / magnitude;
      walkForce.y *= deltaTime * self.walkSpeed / magnitude;


      Matter.Body.translate(body, walkForce);
    }
    else
    {

    }
  };

  self.stop = function(scene)
  {

  };
}

function Input()
{
  this.moveUp = false;
  this.moveDown = false;
  this.moveLeft = false;
  this.moveRight = false;

  this.attackUp = false;
  this.attackDown = false;
  this.attackLeft = false;
  this.attackRight = false;

  var input = this;

  this.onKeyDown = function(event)
  {
    switch(event.keyCode)
    {
      case 87: // W
        input.moveUp = true;
        break;
      case 83: // S
        input.moveDown = true;
        break;
      case 65: // A
        input.moveLeft = true;
        break;
      case 68: // D
        input.moveRight = true;
        break;

      case 73: // I
        input.attackUp = true;
        console.log(input);
        break;
      case 75: // K
        input.attackDown = true;
        break;
      case 74: // J
        input.attackLeft = true;
        break;
      case 76: // L
        input.attackRight = true;
        break;
    }
  };
  this.onKeyUp = function(event)
  {
    switch(event.keyCode)
    {
      case 87:
        input.moveUp = false;
        break;
      case 83:
        input.moveDown = false;
        break;
      case 65:
        input.moveLeft = false;
        break;
      case 68:
        input.moveRight = false;
        break

      case 73: // I
        input.attackUp = false;
        break;
      case 75: // K
        input.attackDown = false;
        break;
      case 74: // J
        input.attackLeft = false;
        break;
      case 76: // L
        input.attackRight = false;
        break;
    }
  };
  document.addEventListener("keydown", this.onKeyDown, false);
  document.addEventListener("keyup", this.onKeyUp, false);
}

Player.prototype = Component;

exports.Player = Player;
