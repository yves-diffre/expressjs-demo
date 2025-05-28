#!/bin/sh
set -o errexit

sed \
  --expression="s/\${INSTRUMENTATION_ID}/$INSTRUMENTATION_ID/g" \
  --expression="s/\${INSTRUMENTATION_METRICS_HOST}/$INSTRUMENTATION_METRICS_HOST/g" \
  --expression="s/\${INSTRUMENTATION_METRICS_PORT}/$INSTRUMENTATION_METRICS_PORT/g" \
  /etc/prometheus/prometheus.yml.template > /etc/prometheus/prometheus.yml
