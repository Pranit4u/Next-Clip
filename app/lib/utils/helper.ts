import toast from "react-hot-toast";
import { ClipInterface, LabelInterface } from "./definition"
import { v4 as uuidv4 } from 'uuid';

export const convertClip = (text: string, labelIDs: string[] = []): ClipInterface => {
  return {
    id: uuidv4(),
    text: text,
    pinned: false,
    labelIDs: labelIDs,
  }
}

export const convertLabel = (name: string, clipIDs: string[] = []): LabelInterface => {
  return {
    id: uuidv4(),
    name: name,
    clipIDs: clipIDs,
  }
}

export const filterNameAndLabel = (clips: ClipInterface[], labels: LabelInterface[], query: string): ClipInterface[] => {
  const normalizedQuery = query.toLowerCase();
  return clips.filter(clip =>
    clip.text.toLowerCase().includes(normalizedQuery) ||
    clip.labelIDs.some(labelID =>
      labels.find(label => label.id === labelID)?.name.toLowerCase().includes(normalizedQuery)
    )
  );
}

export const removeLabelFromClip = (clip: ClipInterface, labelID: string): ClipInterface => {
  return {
    ...clip,
    labelIDs: clip.labelIDs.filter(id => id !== labelID),
  }
}

export const removeClipFromLabel = (label: LabelInterface, clipID: string): LabelInterface => {
  return {
    ...label,
    clipIDs: label.clipIDs.filter(id => id !== clipID),
  }
}

export const addLabelToClip = (clip: ClipInterface, labelID: string): ClipInterface => {
  return {
    ...clip,
    labelIDs: [...clip.labelIDs, labelID],
  }
}

export const addClipToLabel = (label: LabelInterface, clipID: string): LabelInterface => {
  return {
    ...label,
    clipIDs: [...label.clipIDs, clipID],
  }
}

export const removeClipFromLabels = (labels: LabelInterface[], clipID: string): LabelInterface[] => {
  return labels.map(label => removeClipFromLabel(label, clipID));
}

export const removeLabelFromClips = (clips: ClipInterface[], labelID: string): ClipInterface[] => {
  return clips.map(clip => removeLabelFromClip(clip, labelID));
}

const showSuccessToast = () => toast.success('Copied to clipboard', {
  duration: 1000,
  position: 'top-left'
});

const showErrorToast = () => toast.success('Something broke! Try Again.', {
  duration: 1000,
  position: 'top-left'
});

export const copyToClipboard = (title: string) => {
  navigator.clipboard.writeText(title)
      .then(() => {
        showSuccessToast();
      })
      .catch(() => {
        showErrorToast();
      });
}