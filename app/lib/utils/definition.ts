export type ClipInterface = {
  id: string;
  text: string;
  maskText: string;
  pinned: boolean;
  labelIDs: string[];
  createdAt: string;
}

export type LabelInterface = {
  id: string;
  name: string;
  clipIDs: string[];
  createdAt: string;
}

export type TooltipObjectInterface = {
  search: boolean;
  labelOption: boolean;
  setting: boolean;
  refresh: boolean;
  clips: boolean;
  labelInput: boolean;
  clipInput: boolean;
  maskInput: boolean;
}