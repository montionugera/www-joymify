export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["images/game-platform-hero.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.ClO3dUNJ.js",app:"_app/immutable/entry/app.10oHvs7W.js",imports:["_app/immutable/entry/start.ClO3dUNJ.js","_app/immutable/chunks/DBali2jt.js","_app/immutable/chunks/CYGJVB1E.js","_app/immutable/entry/app.10oHvs7W.js","_app/immutable/chunks/CYGJVB1E.js","_app/immutable/chunks/CW7J5feE.js","_app/immutable/chunks/B6gAbhUk.js","_app/immutable/chunks/BowrPi3x.js","_app/immutable/chunks/CZ4C9eOg.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/pillars",
				pattern: /^\/api\/pillars\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/pillars/_server.ts.js'))
			},
			{
				id: "/api/pulse",
				pattern: /^\/api\/pulse\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/pulse/_server.ts.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
