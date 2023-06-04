import { CoreStore } from "lattice-engine/core";
import { OrbitControls } from "lattice-engine/orbit";
import {
  GlobalTransform,
  Parent,
  PerspectiveCamera,
  SceneStruct,
  Transform,
} from "lattice-engine/scene";
import { Vrm } from "lattice-engine/vrm";
import { Commands, Mut, Res } from "thyseus";

import { createScene } from "../../utils/createScene";

/**
 * System to initialize the scene.
 */
export function initScene(
  commands: Commands,
  coreStore: Res<Mut<CoreStore>>,
  sceneStruct: Res<Mut<SceneStruct>>
) {
  const scene = createScene(commands, coreStore, sceneStruct);

  // Create camera
  const camera = commands
    .spawn()
    .add(new Transform([0, 1, -3]))
    .addType(GlobalTransform)
    .addType(PerspectiveCamera)
    .addType(OrbitControls);
  sceneStruct.activeCamera = camera.id;

  // Create VRM
  commands
    .spawn()
    .add(new Transform([0, -0.5, 0]))
    .addType(GlobalTransform)
    .add(new Parent(scene))
    .add(new Vrm("/k-robot.vrm"));
}
