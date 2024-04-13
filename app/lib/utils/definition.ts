export type ClipInterface = {
  id: string;
  text: string;
  pinned: boolean;
  labelIDs: string[];
}

export type LabelInterface = {
  id: string;
  name: string;
  clipIDs: string[];
}
