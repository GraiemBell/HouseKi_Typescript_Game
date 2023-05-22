import {
  ContextMenuEvent,
  keyboardEventFromECS,
  KeyDownEvent,
  mouseEventFromECS,
  OnWheelEvent,
  PointerCancelEvent,
  PointerDownEvent,
  pointerEventFromECS,
  PointerMoveEvent,
  PointerUpEvent,
  wheelEventFromECS,
} from "@lattice-engine/input";
import { RenderStore } from "@lattice-engine/render";
import { PerspectiveCamera, Position, Rotation } from "@lattice-engine/scene";
import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Entity, EventReader, Mut, Query, Res, SystemRes, With } from "thyseus";

import { OrbitControls } from "./components";

/**
 * A mock element we can pass into Three.js OrbitControls.
 * We use this to capture events from the ECS and pass them into OrbitControls.
 */
class MockElement extends EventTarget {
  style = {};
  setPointerCapture() {}
  releasePointerCapture() {}
  clientHeight = 0;
  clientWidth = 0;
}

class LocalStore {
  readonly mockElement = new MockElement();

  /**
   * Entity ID -> Three.js OrbitControls object
   */
  readonly objects = new Map<bigint, ThreeOrbitControls>();
}

/**
 * Orbit controls system.
 * Uses the built in OrbitControls from Three.js.
 */
export function orbitControls(
  renderStore: Res<RenderStore>,
  localStore: SystemRes<LocalStore>,
  entities: Query<Entity, With<[OrbitControls, PerspectiveCamera]>>,
  withPositions: Query<[Entity, Mut<Position>], With<PerspectiveCamera>>,
  withRotations: Query<[Entity, Mut<Rotation>], With<PerspectiveCamera>>,
  pointerDownReader: EventReader<PointerDownEvent>,
  pointerMoveReader: EventReader<PointerMoveEvent>,
  pointerCancelReader: EventReader<PointerCancelEvent>,
  pointerUpReader: EventReader<PointerUpEvent>,
  contextMenuReader: EventReader<ContextMenuEvent>,
  onWheelReader: EventReader<OnWheelEvent>,
  keyDownReader: EventReader<KeyDownEvent>
) {
  const ids: bigint[] = [];

  // Update mock element size
  localStore.mockElement.clientWidth =
    renderStore.renderer.domElement.clientWidth;
  localStore.mockElement.clientHeight =
    renderStore.renderer.domElement.clientHeight;

  // Create new objects
  for (const { id } of entities) {
    ids.push(id);

    if (localStore.objects.has(id)) continue;

    const cameraObject = renderStore.perspectiveCameras.get(id);
    if (!cameraObject) continue;

    const object = new ThreeOrbitControls(
      cameraObject,
      localStore.mockElement as any
    );
    object.enableDamping = true;

    localStore.objects.set(id, object);
  }

  // Send events to mock element
  for (const data of pointerDownReader) {
    const event = pointerEventFromECS("pointerdown", data);
    localStore.mockElement.dispatchEvent(event);
  }

  for (const data of pointerMoveReader) {
    const event = pointerEventFromECS("pointermove", data);
    localStore.mockElement.dispatchEvent(event);
  }

  for (const data of pointerCancelReader) {
    const event = pointerEventFromECS("pointercancel", data);
    localStore.mockElement.dispatchEvent(event);
  }

  for (const data of pointerUpReader) {
    const event = pointerEventFromECS("pointerup", data);
    localStore.mockElement.dispatchEvent(event);
  }

  for (const data of contextMenuReader) {
    const event = mouseEventFromECS("contextmenu", data);
    localStore.mockElement.dispatchEvent(event);
  }

  for (const data of onWheelReader) {
    const event = wheelEventFromECS("wheel", data);
    localStore.mockElement.dispatchEvent(event);
  }

  for (const data of keyDownReader) {
    const event = keyboardEventFromECS("keydown", data);
    localStore.mockElement.dispatchEvent(event);
  }

  // Clear event queues
  pointerMoveReader.clear();
  pointerDownReader.clear();
  pointerUpReader.clear();
  pointerCancelReader.clear();
  contextMenuReader.clear();
  onWheelReader.clear();
  keyDownReader.clear();

  // Update objects
  for (const object of localStore.objects.values()) {
    object.update();
  }

  // Save positions
  for (const [{ id }, position] of withPositions) {
    const object = localStore.objects.get(id);
    if (!object) continue;

    const cameraObject = renderStore.perspectiveCameras.get(id);
    if (!cameraObject) continue;

    position.x = cameraObject.position.x;
    position.y = cameraObject.position.y;
    position.z = cameraObject.position.z;
  }

  // Save rotations
  for (const [{ id }, rotation] of withRotations) {
    const object = localStore.objects.get(id);
    if (!object) continue;

    const cameraObject = renderStore.perspectiveCameras.get(id);
    if (!cameraObject) continue;

    rotation.x = cameraObject.quaternion.x;
    rotation.y = cameraObject.quaternion.y;
    rotation.z = cameraObject.quaternion.z;
    rotation.w = cameraObject.quaternion.w;
  }

  // Remove objects that no longer exist
  for (const id of localStore.objects.keys()) {
    if (!ids.includes(id)) {
      const object = localStore.objects.get(id) as ThreeOrbitControls;
      if (object) object.dispose();

      localStore.objects.delete(id);
    }
  }
}
