declare module "redux-persist-transform-immutable" {
  import { Transform } from "redux-persist";
  import Immutable from "immutable";

  export default function createTransform(
    inbound: (state: any, key: string) => any,
    outbound: (state: any, key: string) => any,
    config?: { whitelist?: string[]; blacklist?: string[] }
  ): Transform;

  export function createImmutableTransform(
    inbound: (state: Immutable.Record<any>) => any,
    outbound: (state: any) => Immutable.Record<any>,
    config?: { whitelist?: string[]; blacklist?: string[] }
  ): Transform;
}
