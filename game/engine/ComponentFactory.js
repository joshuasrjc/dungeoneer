var PhysicsBody = require("./PhysicsBody.js").PhysicsBody;
var Player = require("./Player.js").Player;
var GameSprite = require("./GameSprite.js").GameSprite;

function Component(gameObject)
{
  this.gameObject = gameObject;
  this.name = "Component";
  this.init = function(){};
  this.start = function(scene){};
  this.update = function(scene){};
  this.stop = function(scene){};
}

function createComponent(gameObject, componentData)
{
  var name = componentData.name;
  console.log("Component Name:" + name);
  var component = new Component(gameObject);

  if(name == "PhysicsBody")
  {
    PhysicsBody.call(component);
  }
  else if(name == "Player")
  {
    Player.call(component);
  }
  else if(name == "GameSprite")
  {
    GameSprite.call(component);
  }

  copyProperties(componentData, component);

  component.init();

  return component;
}

//Copies from obj1 to obj2
function copyProperties(obj1, obj2)
{
  for(var index in obj1)
  {
    var property = obj1[index];

    if(typeof property == "object")
    {
      console.log(typeof property);
      var temp = {};
      copyProperties(property, temp);
      property = temp;
    }

    obj2[index] = property;
  }
}

exports.createComponent = createComponent;
exports.Component = Component;
