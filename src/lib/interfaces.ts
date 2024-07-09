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
  likes: string[];
  replies: object[];
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

export interface InterfaceSmartContract {
  _id: string;
  ideaId: string;
  contractAddress: string;
  type: string;
}
