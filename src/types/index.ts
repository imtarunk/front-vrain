export interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  sharedWith?: {
    userId: string;
    permissionType: "view" | "edit" | "admin";
  }[];
}

export interface Card {
  _id: string;
  link: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
}

export interface LinkData {
  _id: string;
  title: string;
  link: string;
  hash: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}
