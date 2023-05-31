import { Vec3 } from "@lattice-engine/core";
import { Entity, EntityCommands, initStruct, struct } from "thyseus";

export class Velocity extends Vec3 {}

@struct
export class BoxCollider {
  @struct.substruct(Vec3) declare size: Vec3;

  constructor(size: Readonly<[number, number, number]> = [1, 1, 1]) {
    initStruct(this);

    this.size.fromArray(size);
  }
}

@struct
export class SphereCollider {
  @struct.f32 declare radius: number;

  constructor(radius = 0.5) {
    initStruct(this);

    this.radius = radius;
  }
}

@struct
export class CapsuleCollider {
  @struct.f32 declare radius: number;
  @struct.f32 declare height: number;

  constructor(radius = 0.5, height = 1) {
    initStruct(this);

    this.radius = radius;
    this.height = height;
  }
}

@struct
export class CylinderCollider {
  @struct.f32 declare radius: number;
  @struct.f32 declare height: number;

  constructor(radius = 0.5, height = 1) {
    initStruct(this);

    this.radius = radius;
    this.height = height;
  }
}

@struct
export class HullCollider {
  @struct.u64 declare meshId: bigint;

  constructor(mesh?: Entity | EntityCommands) {
    initStruct(this);

    if (mesh) this.meshId = mesh.id;
  }
}

@struct
export class MeshCollider {
  @struct.u64 declare meshId: bigint;

  constructor(mesh?: Entity | EntityCommands) {
    initStruct(this);

    if (mesh) this.meshId = mesh.id;
  }
}

@struct
export class StaticBody {}

@struct
export class KinematicBody {}

@struct
export class DynamicBody {}

@struct
export class CharacterController {
  @struct.f32 declare offset: number;

  @struct.f32 declare maxSlopeClimbAngle: number;
  @struct.f32 declare minSlopeSlideAngle: number;

  @struct.bool declare enableAutostep: boolean;
  @struct.f32 declare maxStepHeight: number;
  @struct.f32 declare minStepWidth: number;
  @struct.bool declare stepOnDynamicBodies: boolean;

  @struct.bool declare enableSnapToGround: boolean;
  @struct.f32 declare snapToGroundDistance: number;

  @struct.bool declare applyImpulsesToDynamicBodies: boolean;

  @struct.bool declare isGrounded: boolean;

  constructor(offset = 0.01) {
    initStruct(this);

    this.offset = offset;

    this.maxSlopeClimbAngle = (45 * Math.PI) / 180;
    this.minSlopeSlideAngle = (30 * Math.PI) / 180;

    this.enableAutostep = true;
    this.maxStepHeight = 0.5;
    this.minStepWidth = 0.2;
    this.stepOnDynamicBodies = false;

    this.enableSnapToGround = true;
    this.snapToGroundDistance = 0.1;

    this.applyImpulsesToDynamicBodies = true;
  }
}

/**
 * @see https://rapier.rs/docs/user_guides/javascript/scene_queries/#ray-casting
 */
@struct
export class Raycast {
  @struct.substruct(Vec3) declare origin: Vec3;
  @struct.substruct(Vec3) declare direction: Vec3;
  @struct.f32 declare maxToi: number;
  @struct.bool declare solid: boolean;

  /**
   * Entity ID of a rigid body that should be excluded from the ray cast.
   */
  @struct.u64 declare excludeRigidBodyId: bigint;

  @struct.bool declare hit: boolean;
  @struct.f32 declare hitToi: number;

  constructor(
    origin: Readonly<[number, number, number]> = [0, 0, 0],
    direction: Readonly<[number, number, number]> = [0, 0, 0],
    maxToi = 1000,
    solid = false
  ) {
    initStruct(this);

    this.origin.fromArray(origin);
    this.direction.fromArray(direction);

    this.maxToi = maxToi;
    this.solid = solid;
  }
}
