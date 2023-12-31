import { EffectComposer } from "postprocessing";
import {
  AmbientLight,
  AnimationClip,
  AnimationMixer,
  BufferGeometry,
  DirectionalLight,
  KeyframeTrack,
  Line,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Points,
  Scene,
  WebGLRenderer,
} from "three";
import { struct, type u32 } from "thyseus";

export type EntityID = bigint;

export type MeshLike = Mesh | LineSegments | Line | LineLoop | Points;

export class RenderStore {
  static DEFAULT_MATERIAL = new MeshStandardMaterial();

  renderer = new WebGLRenderer();
  composer = new EffectComposer(this.renderer);

  readonly perspectiveCameras = new Map<EntityID, PerspectiveCamera>();
  readonly scenes = new Map<EntityID, Scene>();
  readonly geometries = new Map<EntityID, BufferGeometry>();
  readonly basicMaterials = new Map<EntityID, MeshBasicMaterial>();
  readonly standardMaterials = new Map<EntityID, MeshStandardMaterial>();
  readonly lineMaterials = new Map<EntityID, LineBasicMaterial>();
  readonly images = new Map<EntityID, ImageBitmap>();
  readonly meshes = new Map<EntityID, MeshLike>();
  readonly nodes = new Map<EntityID, Object3D>();
  readonly animationMixers = new Map<EntityID, AnimationMixer>();
  readonly animationClips = new Map<EntityID, AnimationClip>();
  readonly keyframeTracks = new Map<EntityID, KeyframeTrack>();
  readonly ambientLights = new Map<EntityID, AmbientLight>();
  readonly directionalLights = new Map<EntityID, DirectionalLight>();

  constructor() {
    this.materials[Symbol.iterator] =
      this.materials[Symbol.iterator].bind(this);
  }

  getMaterial(id: EntityID) {
    return (
      this.standardMaterials.get(id) ??
      this.basicMaterials.get(id) ??
      this.lineMaterials.get(id)
    );
  }

  readonly materials = {
    [Symbol.iterator]: function* (this: RenderStore) {
      for (const material of this.standardMaterials.values()) yield material;
      for (const material of this.basicMaterials.values()) yield material;
      for (const material of this.lineMaterials.values()) yield material;
    },
  };
}

@struct
export class RenderStats {
  frame: u32 = 0;
  calls: u32 = 0;
  lines: u32 = 0;
  points: u32 = 0;
  triangles: u32 = 0;
  geometries: u32 = 0;
  textures: u32 = 0;
  shaders: u32 = 0;
}
