const manifest = (() => {
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
		client: {"start":"_app/immutable/entry/start.Dg8iRLLi.js","app":"_app/immutable/entry/app.B65Z6BHy.js","imports":["_app/immutable/entry/start.Dg8iRLLi.js","_app/immutable/chunks/entry.BhNOKdwp.js","_app/immutable/chunks/scheduler.DviErbFD.js","_app/immutable/entry/app.B65Z6BHy.js","_app/immutable/chunks/scheduler.DviErbFD.js","_app/immutable/chunks/index.ByO29dwQ.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-CXBeZ6pG.js')),
			__memo(() => import('./chunks/1-CQgGfvn1.js')),
			__memo(() => import('./chunks/2-ZNfzNorN.js'))
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

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
