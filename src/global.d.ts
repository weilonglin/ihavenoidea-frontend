type VoteType = {
  id: number;
  resourceId: number;
  userIp: string;
};

type CategoryType = {
  name: string;
};

type CardType = {
  id: number;
  name: string;
  description: string;
  vote: VoteType[];
  link: string;
  category: CategoryType;
  tags: string[];
};
