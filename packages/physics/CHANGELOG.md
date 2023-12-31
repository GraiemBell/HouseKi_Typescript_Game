# @houseki-engine/physics

## 8.0.0

### Minor Changes

- 7b6110f: upgrade to thyseus 15

### Patch Changes

- 78f9105: upgrade deps
- Updated dependencies [78f9105]
- Updated dependencies [7b6110f]
  - @houseki-engine/core@1.2.0
  - @houseki-engine/scene@3.0.0

## 7.0.0

### Minor Changes

- 04031cf: refactor scene structure

### Patch Changes

- Updated dependencies [b0cdca5]
- Updated dependencies [04031cf]
  - @houseki-engine/scene@2.1.0

## 6.1.1

### Patch Changes

- d39a258: physics import / export fixes

## 6.1.0

### Minor Changes

- b023781: improve mesh collider logic, now uses a compound collider for all meshes attached to the node, rather than separate MeshCollider / RigidBody components for each Mesh

## 6.0.1

### Patch Changes

- 710c860: fix transformation math (remove gl-matrix)
- Updated dependencies [710c860]
- Updated dependencies [710c860]
  - @houseki-engine/scene@2.0.1
  - @houseki-engine/core@1.1.1

## 6.0.0

### Patch Changes

- Updated dependencies [845c663]
- Updated dependencies [5a49832]
  - @houseki-engine/core@1.1.0
  - @houseki-engine/scene@2.0.0

## 5.0.1

### Patch Changes

- 215eff0: upgrade deps
- Updated dependencies [215eff0]
  - @houseki-engine/scene@1.0.1
  - @houseki-engine/core@1.0.1

## 5.0.0

### Major Changes

- 32d0cc6: upgrade to thyseus 14

### Patch Changes

- Updated dependencies [32d0cc6]
  - @houseki-engine/scene@1.0.0
  - @houseki-engine/core@1.0.0

## 4.0.2

### Patch Changes

- 4588798: remove string component types
- Updated dependencies [4588798]
  - @houseki-engine/scene@0.7.2
  - @houseki-engine/core@0.2.7

## 4.0.1

### Patch Changes

- 33a8344: add better warehouse typesafety
- Updated dependencies [33a8344]
  - @houseki-engine/core@0.2.6
  - @houseki-engine/scene@0.7.1

## 4.0.0

### Patch Changes

- Updated dependencies [0e4d752]
  - @houseki-engine/scene@0.7.0

## 3.0.3

### Patch Changes

- 3addbfb: add catch for 0 direction raycast

## 3.0.2

### Patch Changes

- a74c565: fixed loop timing fixes
- Updated dependencies [a74c565]
  - @houseki-engine/core@0.2.5
  - @houseki-engine/scene@0.6.2

## 3.0.1

### Patch Changes

- ffea4d9: upgrade thyseus
- Updated dependencies [ffea4d9]
  - @houseki-engine/scene@0.6.1
  - @houseki-engine/core@0.2.4

## 3.0.0

### Patch Changes

- e3e7e0f: upgrade thyseus
- Updated dependencies [a1c368e]
- Updated dependencies [e3e7e0f]
  - @houseki-engine/scene@0.6.0
  - @houseki-engine/core@0.2.3

## 2.0.0

### Patch Changes

- 7a82a45: upgrade thyseus to 0.13.2
- Updated dependencies [3eee506]
- Updated dependencies [7a82a45]
  - @houseki-engine/scene@0.5.0
  - @houseki-engine/core@0.2.2

## 1.0.0

### Patch Changes

- Updated dependencies [e2015e3]
  - @houseki-engine/scene@0.4.0

## 0.3.1

### Patch Changes

- cc0fc73: upgrade thyseus
- Updated dependencies [cc0fc73]
  - @houseki-engine/core@0.2.1
  - @houseki-engine/scene@0.3.1

## 0.3.0

### Patch Changes

- Updated dependencies [589fac4]
  - @houseki-engine/core@0.2.0
  - @houseki-engine/scene@0.3.0

## 0.2.0

### Minor Changes

- Updated dependencies [93c1536]
  - @houseki-engine/scene@0.2.0

## 0.1.1

### Patch Changes

- fddc570: Add pre and post update schedules. This removes all `first()` and `last()` scheduling calls, which was causing some weird bugs.
- Updated dependencies [fddc570]
  - @houseki-engine/core@0.1.1
  - @houseki-engine/scene@0.1.1
