

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.BEOVEx0s.js","_app/immutable/chunks/scheduler.DviErbFD.js","_app/immutable/chunks/index.ByO29dwQ.js"];
export const stylesheets = ["_app/immutable/assets/2.aKJbHb5u.css"];
export const fonts = [];
