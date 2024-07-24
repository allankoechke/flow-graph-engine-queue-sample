export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.B7MqELhb.js","app":"_app/immutable/entry/app.CbPxj6H_.js","imports":["_app/immutable/entry/start.B7MqELhb.js","_app/immutable/chunks/entry.dC2I_76n.js","_app/immutable/chunks/scheduler.DohcnHcg.js","_app/immutable/entry/app.CbPxj6H_.js","_app/immutable/chunks/scheduler.DohcnHcg.js","_app/immutable/chunks/index.Cl3zgpww.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";