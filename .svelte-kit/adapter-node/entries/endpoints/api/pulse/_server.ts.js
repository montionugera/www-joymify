import { json } from "@sveltejs/kit";
import { a as getLyzdaPulse } from "../../../../chunks/mock-engine.js";
const GET = async ({ url }) => {
  const isBullMode = url.searchParams.get("mode") === "bull";
  const pulse = await getLyzdaPulse(isBullMode);
  return json(pulse, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-Powered-By": "Joymify BFF"
    }
  });
};
export {
  GET
};
