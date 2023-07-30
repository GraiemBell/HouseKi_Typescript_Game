import { Mut, Res, struct, SystemRes, World, type f32 } from "thyseus";

import { Time } from "../resources";
import { LatticeSchedules } from "../schedules";

const FIXED_HZ = 60;
const FIXED_STEP_MS = 1000 / FIXED_HZ;

@struct
class LocalRes {
  timeSinceLastFixedUpdate: f32 = 0;
}

export async function runFixedLoop(
  world: World,
  time: Res<Mut<Time>>,
  localRes: SystemRes<LocalRes>
) {
  const now = performance.now();
  const delta = now - time.fixedTime;
  localRes.timeSinceLastFixedUpdate += delta;

  while (localRes.timeSinceLastFixedUpdate >= FIXED_STEP_MS) {
    time.fixedTime = now;
    time.fixedDelta = FIXED_STEP_MS / 1000;

    await runSchedule(world, LatticeSchedules.PreFixedUpdate);
    await runSchedule(world, LatticeSchedules.FixedUpdate);
    await runSchedule(world, LatticeSchedules.PostFixedUpdate);

    localRes.timeSinceLastFixedUpdate -= FIXED_STEP_MS;
  }
}

function runSchedule(world: World, schedule: symbol) {
  if (world.schedules[schedule]) {
    return world.runSchedule(schedule);
  }
}
