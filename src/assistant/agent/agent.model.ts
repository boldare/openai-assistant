export type Agent = (data: AgentData) => Promise<string>;
export type Agents = Record<string, Agent>;

export interface AgentData {
  threadId: string;
  params: string;
}
