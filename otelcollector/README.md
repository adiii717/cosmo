# OTEL Collector

The OpenTelemetry Collector is a vendor-agnostic service that allows to receive, process and export telemetry data. It is based on the OpenTelemetry Collector project.

## Build

You can simply build the collector by running the following command from the root of the repository:

```shell
docker compose -f docker-compose.yml build otelcollector --no-cache
```

(Optional) Please read the [Building a custom collector](https://opentelemetry.io/docs/collector/custom-collector/) to learn how to build a custom collector.
Ensure you have the latest version of the [OpenTelemetry Collector Builder](https://github.com/open-telemetry/opentelemetry-collector/releases/tag/cmd%2Fbuilder%2Fv0.81.0) installed.
