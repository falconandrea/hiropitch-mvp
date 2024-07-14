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
  file: {
    filePublicUrl: string;
    filePath: string;
    fileId: string;
  };
  image: {
    filePublicUrl: string;
    filePath: string;
    fileId: string;
  };
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

export interface InterfaceTransaction {
  _id: string;
  smartContractId: {
    _id: string;
    ideaId: {
      _id: string;
      title: string;
    };
    contractAddress: string;
  };
  userId: string;
  hash: string;
  description: string;
  createdAt: string;
}

export interface InterfaceUser {
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName: string;
  lastName: string;
  mobile: string;
  about: string;
  address: string;
  vatNumber: string;
  fiscalCode: string;
  birthDate: string;
  companyName: string;
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}
