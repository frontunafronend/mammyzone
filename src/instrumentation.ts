export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { assertProductionDeploymentEnvOrThrow } = await import("@/server/config/env");
    assertProductionDeploymentEnvOrThrow();
  }
}
