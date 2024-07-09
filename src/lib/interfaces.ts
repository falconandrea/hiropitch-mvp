export interface InterfacePost {
  _id: string;
  content: string;
  ideaId: {
    _id: string;
    title: string;
  };
  userId: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  counters: {
    like: number;
    comments: number;
    tips: number;
    investors: number;
  };
}

export interface InferfaceIdea {
  _id: string;
  title: string;
  description: string;
  category: string;
  contractType: string;
  creatorId: {
    firstName: string;
    lastName: string;
  };
  authors: { _id: string; firstName: string; lastName: string }[];
  referenceLinks: string[];
  file: object;
  fileStructure: object;
}
