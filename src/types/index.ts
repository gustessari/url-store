export interface Topic {
  name: string;
  links: Link[];
}

export interface Link {
  url: string;
  createdAt: Date;
  description?: string;
}

export interface TopicsStore {
  [key: string]: Link[];
}