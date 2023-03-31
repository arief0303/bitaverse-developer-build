import React, { PureComponent, useRef, useEffect } from "react"
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { CharacterController } from "babylonjs-charactercontroller";
import * as GUI from 'babylonjs-gui';
import CharacterCustomization from './CharacterCustomization';
import { setupCharacter, setupCharacterPack } from './character_customize';
import Joystick from './Joystick';

/**
 * Babylon 3D Scene.
 */
export default class BabylonScene extends PureComponent {
  componentDidMount() {
    this.setup(this.canvas)
  }

  setup = (canvas) => {
    let map = "Full_Area-centered.glb";
    let devRoom = "landmark-benchmark.glb";
    var player;
    var cc;
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width * 0.5; // Set canvas width to 50% of the viewport width
    canvas.height = height * 0.5; // Set canvas height to 50% of the viewport height
    const engine = this.createEngine(canvas);
    const scene = new BABYLON.Scene(engine);
    const light = new BABYLON.HemisphericLight("Light", new BABYLON.Vector3(0.33, 1, -0.67), scene);
    light.intensity = 0.9;
    // var octree = scene.createOrUpdateSelectionOctree();

    // Performance Optimizations
    // freezing the materials to reduce unwanted calculations
    scene.freezeMaterials();
    scene.fogEnabled = true;
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP2
    scene.fogDensity = 0.03;
    scene.getAnimationRatio();
    // scene.useGeometryIdsMap = true;
    scene.freezeActiveMeshes();
    // BABYLON.SceneOptimizer.OptimizeAsync(scene);

    // debug tools
    var adv = GUI.AdvancedDynamicTexture.CreateFullscreenUI();
    var debugBtn = GUI.Button.CreateSimpleButton("", "debug");
    debugBtn.width = "100px";
    debugBtn.height = "30px"
    debugBtn.background = "white"
    debugBtn.verticalAlignment = 1;
    debugBtn.horizontalAlignment = 0;
    debugBtn.left = "15px";
    debugBtn.top = "-15px";
    debugBtn.onPointerClickObservable.add(() => { scene.debugLayer.show(); });

    // wireframe material
    var matBB = new BABYLON.StandardMaterial("matBB", scene);
    matBB.emissiveColor = new BABYLON.Color3(1, 1, 1);
    matBB.wireframe = true;

    // Player Bounding Box
    var pbb = BABYLON.Mesh.CreateBox("PBB", 1, scene);
    pbb.scaling = new BABYLON.Vector3(1, 1, 1);
    pbb.parent = player;
    pbb.material = matBB;

    // Teleport Area
    var teleportBox = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
    teleportBox.position = new BABYLON.Vector3(0, 1, 5);
    teleportBox.scaling = new BABYLON.Vector3(1, 2, 1);
    var material = new BABYLON.StandardMaterial("boxMaterial", scene);
    material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1);
    material.alpha = 0.5;
    teleportBox.material = material;
    teleportBox.computeWorldMatrix(true);
    teleportBox.actionManager = new BABYLON.ActionManager(scene);
    teleportBox.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
      trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
      parameter: pbb
    }, function () {
      console.log("intersect");
      scene.getMeshByName("env").dispose();
      teleportBox.dispose();
      loadMap(devRoom);
    }));

    // Player Marker
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", { height: 0.5, width: 1 });
    plane.billboardMode = 7;
    plane.checkCollisions = false;
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);
    var marker = new GUI.TextBlock("marker", "Guest");
    marker.width = 1;
    marker.height = 0.5;
    marker.color = "#0DF0F5";
    marker.fontSize = 300;
    marker.fontFamily = "Rajdhani";
    advancedTexture.addControl(marker);

    // Commands
    loadMap(map);
    loadPlayer(scene, engine, canvas);
    adv.addControl(debugBtn);
    engine.runRenderLoop(engine.renderLoop);

    // Environment Loader
    async function loadMap(map) {
      engine.displayLoadingUI();
      const importPromise = await BABYLON.SceneLoader.ImportMeshAsync("", "assets/env/", map, scene);
      importPromise.meshes.forEach(m => {
        m.checkCollisions = true;
        m.cullingStrategy = BABYLON.AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION; // set culling strategy to improve performance
        m.freezeWorldMatrix(); // freeze world matrix to save resources
      });
      importPromise.meshes[0].name = "env";
      player.position = new BABYLON.Vector3(0, 0, 0); // reset player position
      engine.hideLoadingUI();
    }

    function loadPlayer(scene, engine, canvas) {
      BABYLON.SceneLoader.ImportMesh("", "assets/player/", "chara_full.glb", scene, (meshes, particleSystems, skeletons, animationGroups) => {
        // Setup Avatar Costume
        let characterCustomization = CharacterCustomization.getInstance();
        characterCustomization.setCurrentAvatarPack("Female", "HeadFemaleBase", "BodyFemaleBase", "PantsFemaleBase");
        let characterData = characterCustomization.getCurrentAvatarPack();
        setupCharacterPack(meshes, characterData);

        // Animations
        var keydown;
        const danceAnim = animationGroups[0];
        const helloAnim = animationGroups[2];
        const happyAnim = animationGroups[1];
        const saluteAnim = animationGroups[6];
        const sittingAnim = animationGroups[7];
        const sleepingAnim = animationGroups[8];
        const myAgmap = {
          "idle": animationGroups[3],
          "walk": animationGroups[9],
          "run": animationGroups[5],
          "idleJump": animationGroups[4],
          "runJump": animationGroups[4],
          "dancing": animationGroups[0],
          "happy": animationGroups[1],
          "hello": animationGroups[2],
          "salute": animationGroups[6],
          "sitting": animationGroups[7],
          "sleeping": animationGroups[8],
        };

        // Inputmap
        const inputMap = {};
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
          }),
        );
        scene.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
          }),
        );

        // Player Setup
        player = meshes[0];
        var skeleton = skeletons[0];
        player.skeleton = skeleton;
        player.name = "player";
        skeleton.enableBlending(0.1);
        //if the skeleton does not have any animation ranges then set them as below
        // setAnimationRanges(skeleton);

        player.checkCollisions = true;
        player.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
        player.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0);
        player.rotation = player.rotationQuaternion.toEulerAngles();
        player.rotationQuaternion = null;
        player.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);

        //rotate the camera behind the player
        var alpha = -player.rotation.y - 4.69;
        var beta = Math.PI / 2.5;
        var target = new BABYLON.Vector3(player.position.x, player.position.y + 3, player.position.z);
        var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", alpha, beta, 5, target, scene);

        //standard camera setting
        camera.wheelPrecision = 15;
        camera.checkCollisions = false;
        //make sure the keyboard keys controlling camera are different from those controlling player
        //here we will not use any keyboard keys to control camera
        camera.keysLeft = [];
        camera.keysRight = [];
        camera.keysUp = [];
        camera.keysDown = [];

        camera.lowerRadiusLimit = 2; //how close can the camera come to player
        camera.upperRadiusLimit = 20; //how far can the camera go from the player
        camera.attachControl(canvas, false);
        camera.maxZ = 50;

        //var CharacterController = org.ssatguru.babylonjs.component.CharacterController;
        cc = new CharacterController(player, camera, scene, myAgmap);
        //below makes the controller point the camera at the player head which is approx
        //1.5m above the player origin
        cc.setCameraTarget(new BABYLON.Vector3(0, 2, 0));

        //if the camera comes close to the player we want to enter first person mode.
        cc.setNoFirstPerson(true);
        //the height of steps which the player can climb
        cc.setStepOffset(0.4);
        //the minimum and maximum slope the player can go up
        //between the two the player will start sliding down if it stops
        cc.setSlopeLimit(30, 60);

        // tell controller
        // - which animation range should be used for which player animation
        // - rate at which to play that animation range
        // - wether the animation range should be looped
        //use this if name, rate or looping is different from default
        cc.setIdleAnim("idle", 1, true);
        cc.setTurnLeftAnim("turnLeft", 0.5, true);
        cc.setTurnRightAnim("turnRight", 0.5, true);
        cc.setWalkBackAnim("walkBack", 0.5, true);
        cc.setIdleJumpAnim("idleJump", .5, false);
        cc.setRunJumpAnim("runJump", 0.6, false);
        //set the animation range name to "null" to prevent the controller from playing
        //a player animation.
        //here even though we have an animation range called "fall" we donot want to play
        //the fall animation
        cc.setFallAnim(null, 2, false);
        cc.setSlideBackAnim("slideBack", 1, false)
        animationGroups[0].stop(); //stop default index[0] animation from playing overlapping with idle anim
        cc.start();

        // Setup Joystick
        let joystick = new Joystick(cc);

        // Render Loop
        engine.runRenderLoop(function () {
          scene.render();
          plane.position = new BABYLON.Vector3(player.position.x, player.position.y + 2.75, player.position.z); // keep track of player marker
          pbb.position = new BABYLON.Vector3(player.position.x, player.position.y, player.position.z); // player bounding box

          // Player Emotes
          keydown = false;
          if (inputMap["z"]) { keydown = true; }
          if (inputMap["x"]) { keydown = true; }
          if (inputMap["c"]) { keydown = true; }
          if (inputMap["v"]) { keydown = true; }
          if (inputMap["b"]) { keydown = true; }
          if (inputMap["n"]) { keydown = true; }
          if (keydown) {
            if (inputMap["z"]) { danceAnim.start(); }
            if (inputMap["x"]) { helloAnim.start(); }
            if (inputMap["c"]) { happyAnim.start(); }
            if (inputMap["v"]) { saluteAnim.start(); }
            if (inputMap["b"]) { sittingAnim.start(); }
            if (inputMap["n"]) { sleepingAnim.start(); }
          }
        });
      });

      // this is how you might set the animation ranges for a skeleton
      function setAnimationRanges(skel) {
        delAnimRanges(skel);
        skel.createAnimationRange("fall", 0, 16);
        skel.createAnimationRange("idle", 21, 65);
        skel.createAnimationRange("jump", 70, 94);
        skel.createAnimationRange("run", 100, 121);
        skel.createAnimationRange("slideBack", 125, 129);
        skel.createAnimationRange("strafeLeft", 135, 179);
        skel.createAnimationRange("strafeRight", 185, 229);
        skel.createAnimationRange("turnLeft", 240, 262);
        skel.createAnimationRange("turnRight", 270, 292);
        skel.createAnimationRange("walk", 300, 335);
        skel.createAnimationRange("walkBack", 340, 366);
      }
      /*
      * delete all existing ranges
      * @param {type} skel
      * @returns {undefined}
      */
      function delAnimRanges(skel) {
        let ars = skel.getAnimationRanges();
        let l = ars.length;
        for (let i = 0; i < l; i++) {
          let ar = ars[i];
          console.log(ar.name + "," + ar.from + "," + ar.to);
          skel.deleteAnimationRange(ar.name, false);
        }
      }
    }
  }

  createEngine = (canvas) => {
    const engine = new BABYLON.Engine(canvas)
    engine.renderLoop = () =>
      engine.scenes.forEach((scene) => {
        if (scene.activeCamera) scene.render()
      })
    return engine
  }

  id = "Babylon"

  onMount = (canvas) => (this.canvas = canvas)

  render() {
    return (
      <>
        <canvas id={this.id} ref={this.onMount} style={style} />
      </>
    )
  }
}

const style = { width: "100%", height: "100%" }