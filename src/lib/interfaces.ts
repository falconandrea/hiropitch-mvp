export interface InterfacePost {
  id: number;
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
