import { CoreStore, Warehouse } from "houseki/core";
import {
  MeshCollider,
  PhysicsConfig,
  PrevTargetTransform,
  StaticBody,
  TargetTransform,
} from "houseki/physics";
import { OutlinePass } from "houseki/postprocessing";
import {
  GlobalTransform,
  Mesh,
  Parent,
  RenderView,
  Transform,
} from "houseki/scene";
import { TransformControls, TransformMode } from "houseki/transform";
import { Euler, Quaternion } from "three";
import { Commands, Mut, Query, Res } from "thyseus";

import { createLights } from "../../utils/createLights";
import { createOrbitControls } from "../../utils/createOrbitControls";
import { createScene } from "../../utils/createScene";
import { createBoxGeometry } from "../../utils/geometry";

export function initScene(
  warehouse: Res<Mut<Warehouse>>,
  commands: Commands,
  coreStore: Res<Mut<CoreStore>>,
  physicsConfig: Res<Mut<PhysicsConfig>>
) {
  physicsConfig.debug = true;

  const cameraId = createOrbitControls(commands);
  const { viewId, sceneId } = createScene(commands, coreStore);

  commands.getById(viewId).add(new RenderView(cameraId));

  createLights(commands, sceneId);

  const outlinePass = new OutlinePass();
  outlinePass.visibleEdgeColor = [1, 0, 0];
  outlinePass.hiddenEdgeColor = [0, 1, 1];

  commands.getById(sceneId).add(outlinePass);

  const geometry = createBoxGeometry(warehouse);
  const parent = new Parent(sceneId);
  const transform = new Transform([2, 0, 0]);

  const boxId = commands
    .spawn(true)
    .add(transform)
    .addType(GlobalTransform)
    .add(parent)
    .addType(Mesh)
    .add(geometry).id;

  transform.translation.set(0, 0, 0);

  const euler = new Euler(0, 75, 0);
  const quat = new Quaternion();
  quat.setFromEuler(euler);
  transform.rotation.fromObject(quat);

  transform.scale.set(2, 1, 1);

  const targetTransform = new TargetTransform();
  targetTransform.copy(transform);

  const prevTargetTransform = new PrevTargetTransform();
  prevTargetTransform.copy(transform);

  commands
    .spawn(true)
    .add(transform)
    .add(targetTransform)
    .add(prevTargetTransform)
    .addType(MeshCollider)
    .addType(StaticBody)
    .addType(GlobalTransform)
    .add(parent)
    .addType(Mesh)
    .add(geometry).id;

  const transformControls = new TransformControls();
  transformControls.targetId = boxId;

  commands.spawn(true).add(transformControls);
}

export const transformConfig = {
  enabled: true,
  mode: TransformMode.Translate,
};

export function setTransformMode(
  transformControls: Query<Mut<TransformControls>>
) {
  for (const controls of transformControls) {
    controls.mode = transformConfig.mode;
    controls.enabled = transformConfig.enabled;
  }
}
