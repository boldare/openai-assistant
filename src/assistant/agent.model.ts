export type Agent = (a: string) => Promise<string>;
export type Agents = Record<string, Agent>;
