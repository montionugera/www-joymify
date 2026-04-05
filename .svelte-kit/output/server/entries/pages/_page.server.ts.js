import { a as getLyzdaPulse, g as getPillarData, b as getAlgoChartData, c as getAgentFeed, d as getCRMStats } from "../../chunks/mock-engine.js";
const load = async ({ url }) => {
  const isBullMode = url.searchParams.get("mode") === "bull";
  const persona = url.searchParams.get("persona");
  const [pulse, pillars, algoChart, agentFeed, crmStats] = await Promise.all([
    getLyzdaPulse(isBullMode),
    getPillarData(persona, isBullMode),
    getAlgoChartData(isBullMode),
    getAgentFeed(isBullMode),
    getCRMStats(isBullMode)
  ]);
  return {
    pulse,
    pillars,
    algoChart,
    agentFeed,
    crmStats,
    isBullMode,
    persona
  };
};
export {
  load
};
