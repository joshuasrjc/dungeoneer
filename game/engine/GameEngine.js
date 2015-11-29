var PhysicsBody = require("./PhysicsBody.js");

function Scene()
{
  var scene = this;

  scene.addGameObject = function(gameObject)
  {
    scene.push(gameObject);
    gameObject.start(scene);
  }

  scene.removeGameObject = function(gameObject)
  {
    for(var i = 0 ; i < scene.length ; i++)
    {
      if(scene[i] == gameObject)
      {
        gameObject.stop();
        scene.splice(1, 1);
      }
    }
  }

}

function GameObject(objData)
{
  var self = this;
  self.components = [];
  self.name = objData.name;

  for(var componentData in objData.components)
  {
    var component = new Component(self);
    var componentClass = componentClassFromName(componentData.name);
    componentClass.call(component, componentData);
    self.components.push(component);
  }

  gameObject.getComponent = function(name)
  {
    for(var comp in self.components)
    {
      if(comp.name == name)
      {
        return comp;
      }
    }
    return null;
  }

  gameObject.start = function(scene)
  { for(var comp in self.components) { comp.start(scene); } }

  gameObject.update = function(scene)
  { for(var comp in self.components) { comp.update(scene); } }

  GameObject.stop = function(scene)
  { for(var comp in self.components) { comp.stop(scene); } }
}

function Component(gameObject)
{
  this.gameObject = gameObject;
  this.name = "Component";
  this.start = function(scene){}
  this.update = function(scene){}
  this.stop = function(scene){}
}

function componentClassFromName(name)
{
  var componentClass;
  switch(name)
  {
    case "PhysicsBody":
      componentClass = PhysicsBody;
      break;
    default:
      componentClass = null;
  }

  return componentClass;
}

function createScene(physicsEngine)
{
  return new Scene(physicsEngine);
}

function createGameObject(objData)
{
  return new GameObject(prefabData);
}

exports.createScene = createScene;

exports.
