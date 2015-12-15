var ComponentFactory = require("./ComponentFactory.js");
var PIXI = require("pixi.js");
var Matter = require("./matter.js");

function Scene()
{
  var scene = this;
  scene.objects = [];
  scene.physicsEngine = new Matter.Engine.create();
  //scene.physicsEngine = new Matter.Engine.create(document.body);
  scene.canvas = new PIXI.Container();
  scene.renderer = PIXI.autoDetectRenderer(800,600, {backgroundColor : 0x000000});
  scene.viewCenter = {x: 0, y: 0};

  scene.addGameObject = function(gameObject)
  {
    scene.objects.push(gameObject);
    gameObject.start(scene);
  }

  scene.removeGameObject = function(gameObject)
  {
    for(var i = 0 ; i < scene.length ; i++)
    {
      if(scene.objects[i] == gameObject)
      {
        gameObject.stop();
        scene.objects.splice(1, 1);
      }
    }
  }

  scene.addBodies = function(bodies)
  {
    Matter.World.add(scene.physicsEngine.world, bodies);
  }

  scene.update = function()
  {
    var deltaTime = scene.physicsEngine.timing.delta / 1000;

    scene.canvas.position.x = -scene.viewCenter.x + 400;
    scene.canvas.position.y = -scene.viewCenter.y + 300;

    for(index in scene.objects)
    {
      scene.objects[index].update(scene, deltaTime);
    }
  }

  scene.draw = function()
  {
    requestAnimationFrame(scene.draw);
    scene.renderer.render(scene.canvas);
  }


  document.getElementById("GameArea").appendChild(scene.renderer.view);
  scene.physicsEngine.world.gravity.y = 0;
  Matter.Events.on(scene.physicsEngine, "beforeUpdate", scene.update);
  Matter.Engine.run(scene.physicsEngine);

  scene.draw();
}

function GameObject(objData)
{
  var self = this;
  self.components = [];
  self.name = objData.name;
  self.objData = objData;

  for(var index in objData.components)
  {
    var componentData = objData.components[index];
    self.comp = componentData;
    var component = ComponentFactory.createComponent(self, componentData);
    self.components.push(component);
  }

  self.getComponent = function(name)
  {
    for(var index in self.components)
    {
      if(self.components[index].name == name)
      {
        return self.components[index];
      }
    }
    return null;
  }

  self.start = function(scene)
  { for(var index in self.components) { self.components[index].start(scene); } }

  self.update = function(scene, deltaTime)
  { for(var index in self.components) { self.components[index].update(scene, deltaTime); } }

  self.stop = function(scene)
  { for(var index in self.components) { self.components[index].stop(scene); } }
}

function createScene()
{
  return new Scene();
}

function createGameObject(objData)
{
  return new GameObject(objData);
}

exports.createScene = createScene;

exports.createGameObject = createGameObject;
