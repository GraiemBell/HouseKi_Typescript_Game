import { RenderStore } from "@houseki-engine/render";
import { RenderView } from "@houseki-engine/scene";
import { EffectComposer, EffectPass } from "postprocessing";
import { Mut, Query, Res, SystemRes } from "thyseus";

import { OutlineRes } from "../resources";

type NotNull<T> = T extends null ? never : T;

class LocalRes {
  pass: EffectPass | null = null;
  composer: EffectComposer | null = null;
}

export function addEffectPass(
  renderStore: Res<RenderStore>,
  outlineRes: Res<Mut<OutlineRes>>,
  localRes: SystemRes<LocalRes>,
  views: Query<RenderView>
) {
  const composerChanged = renderStore.composer !== localRes.composer;
  const effectsChanged = outlineRes.hasChanged;
  if (!composerChanged && !effectsChanged) return;

  for (const renderView of views) {
    if (localRes.pass) {
      renderStore.composer.removePass(localRes.pass);
      localRes.pass.dispose();
    }

    const camera = renderStore.perspectiveCameras.get(renderView.cameraId);
    if (!camera) return;

    const validEffects = [outlineRes.effect].filter(
      (effect): effect is NotNull<typeof effect> => effect !== null
    );
    if (validEffects.length === 0) return;

    // We want to add the pass immediately after the render pass
    // before other post-processing effects, like anti-aliasing.
    const renderIndex = renderStore.composer.passes.findIndex(
      (pass) => pass.name === "RenderPass"
    );
    if (renderIndex === -1) return;

    localRes.pass = new EffectPass(camera, ...validEffects);

    renderStore.composer.addPass(localRes.pass, renderIndex + 1);
    localRes.composer = renderStore.composer;

    outlineRes.hasChanged = false;
  }
}
