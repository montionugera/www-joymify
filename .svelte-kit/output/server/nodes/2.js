import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.BZGFWGkj.js","_app/immutable/chunks/B6gAbhUk.js","_app/immutable/chunks/CYGJVB1E.js","_app/immutable/chunks/CW7J5feE.js","_app/immutable/chunks/CZ4C9eOg.js","_app/immutable/chunks/BowrPi3x.js","_app/immutable/chunks/BbDaDUoi.js","_app/immutable/chunks/DBali2jt.js"];
export const stylesheets = ["_app/immutable/assets/2.DcyjBJRH.css"];
export const fonts = [];
