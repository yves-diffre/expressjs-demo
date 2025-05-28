export const instrumentationEnv = {
  id: String(process.env.INSTRUMENTATION_ID),
  metrics: {
    endpoint: String(process.env.INSTRUMENTATION_METRICS_ENDPOINT),
    host: String(process.env.INSTRUMENTATION_METRICS_HOST),
    port: Number(process.env.INSTRUMENTATION_METRICS_PORT),
  },
  traces: {
    endpoint: String(process.env.INSTRUMENTATION_TRACES_ENDPOINT),
    host: String(process.env.INSTRUMENTATION_TRACES_HOST),
    port: String(process.env.INSTRUMENTATION_TRACES_PORT),
  },
};
