import { Material, Mesh, Node } from "@gltf-transform/core";
import {
  BoxCollider,
  CapsuleCollider,
  CylinderCollider,
  DynamicBody,
  HullCollider,
  KinematicBody,
  MeshCollider,
  PrevTargetTransform,
  SphereCollider,
  TargetTransform,
} from "@houseki-engine/physics";
import {
  GlobalTransform,
  Name,
  Parent,
  Transform,
} from "@houseki-engine/scene";

type EntityID = bigint;

export class ImportContext {
  readonly nodes = new Map<Node, EntityID>();
  readonly meshes = new Map<Mesh, EntityID>();
  readonly primitives = new Map<Mesh, EntityID[]>();
  readonly materials = new Map<Material, EntityID>();

  readonly primitiveIds: EntityID[] = [];
  readonly materialIds: EntityID[] = [];
  readonly textureIds: EntityID[] = [];
  readonly animationClipIds: EntityID[] = [];
  readonly animationMixerIds: EntityID[] = [];
  readonly keyframeTrackIds: EntityID[] = [];

  readonly parent = new Parent();
  readonly transform = new Transform();
  readonly globalTransform = new GlobalTransform();
  readonly targetTransform = new TargetTransform();
  readonly prevTargetTransform = new PrevTargetTransform();
  readonly name = new Name();

  readonly kinematicBody = new KinematicBody();
  readonly dynamicBody = new DynamicBody();

  readonly boxCollider = new BoxCollider();
  readonly sphereCollider = new SphereCollider();
  readonly capsuleCollider = new CapsuleCollider();
  readonly cylinderCollider = new CylinderCollider();
  readonly hullCollider = new HullCollider();
  readonly meshCollider = new MeshCollider();
}
