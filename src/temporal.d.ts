/**
 * Firebase 13 exposes Temporal.Instant in Timestamp type signatures.
 * TypeScript 5.9 does not yet ship the global Temporal namespace.
 * Academy does not call the Temporal conversion APIs; this declaration keeps
 * the dependency types sound without adding a runtime polyfill.
 */
declare namespace Temporal {
  interface Instant {
    readonly epochNanoseconds: bigint;
  }
}
