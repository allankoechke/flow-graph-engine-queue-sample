

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CMxDcg_y.js","_app/immutable/chunks/scheduler.DohcnHcg.js","_app/immutable/chunks/index.Cl3zgpww.js"];
export const stylesheets = ["_app/immutable/assets/2.Cjdyt10T.css"];
export const fonts = [];
