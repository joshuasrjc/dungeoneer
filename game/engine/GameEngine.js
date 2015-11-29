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
  var gameObject = this;
  gameObject.scene = null;



  gameObject.start(scene)
  {
    gameObject.scene = scene;
  }

  GameObject.stop()
  {

  }
}

function createScene(physicsEngine)
{
  return new Scene(physicsEngine);
}

exports.createScene = createScene;

exports.
