/* eslint-disable @typescript-eslint/no-explicit-any */
type ArgumentsTuple = [any, ...unknown[]] | readonly [any, ...unknown[]];

export type Arguments = string | ArgumentsTuple | Record<any, any>;
