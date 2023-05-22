import { Engine } from "@lattice-engine/core";
import { inputPlugin } from "@lattice-engine/input";
import { orbitPlugin } from "@lattice-engine/orbit";
import { renderPlugin } from "@lattice-engine/render";
import { scenePlugin } from "@lattice-engine/scene";
import { CoreSchedule } from "thyseus";

import { initScene } from "./systems";

export const world = await Engine.createWorld()
  .addPlugin(inputPlugin)
  .addPlugin(scenePlugin)
  .addPlugin(renderPlugin)
  .addPlugin(orbitPlugin)
  .addSystemsToSchedule(CoreSchedule.Startup, initScene)
  .build();