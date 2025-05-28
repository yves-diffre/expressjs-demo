import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { env } from "../src/components/env";
import { logger } from "../src/components/logger";

const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations()],
  metricReader: new PrometheusExporter({
    endpoint: env.instrumentation.metrics.endpoint,
    host: env.instrumentation.metrics.host,
    port: env.instrumentation.metrics.port,
  }),
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: env.instrumentation.id,
  }),
  traceExporter: new OTLPTraceExporter({
    headers: {},
    url: "http://<host>:<port><endpoint>"
      .replace("<endpoint>", env.instrumentation.traces.endpoint)
      .replace("<host>", env.instrumentation.traces.host)
      .replace("<port>", env.instrumentation.traces.port),
  }),
});

logger.info("Instrumentation is starting");
sdk.start();

process.on("SIGTERM", async () => {
  try {
    logger.info("Instrumentation is shutting down");
    await sdk.shutdown();
  } catch (error) {
    logger.error(error);
  } finally {
    logger.info("Instrumentation is shut down");
    process.exit(0);
  }
});
