export interface InterfacePost {
  _id: string;
  content: string;
  ideaId: {
    _id: string;
    title: string;
  };
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  likes: string[];
  replies: {
    _id: string;
    text: string;
    author: { _id: string; firstName: string; lastName: string };
    date: string;
  }[];
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
  nftPrice: string;
  nftQty: string;
}

export interface InterfaceSmartContract {
  _id: string;
  ideaId: string;
  contractAddress: string;
  type: string;
}
