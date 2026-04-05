import { json } from "@sveltejs/kit";
import { g as getPillarData } from "../../../../chunks/mock-engine.js";
const POST = async ({ request, url }) => {
  const body = await request.json();
  const persona = body.persona ?? null;
  const isBullMode = url.searchParams.get("mode") === "bull";
  const pillars = await getPillarData(persona, isBullMode);
  return json({ pillars, persona });
};
export {
  POST
};
