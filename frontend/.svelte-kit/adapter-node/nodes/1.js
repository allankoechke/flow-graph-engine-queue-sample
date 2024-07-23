

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.DUMqIOfI.js","_app/immutable/chunks/scheduler.DviErbFD.js","_app/immutable/chunks/index.ByO29dwQ.js","_app/immutable/chunks/entry.BhNOKdwp.js"];
export const stylesheets = [];
export const fonts = [];
