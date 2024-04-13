import React, { useContext } from 'react'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import ClipItem from '../components/ClipItem';
import { SearchContext } from '../SearchContext';
import { ClipInterface, LabelInterface } from '../lib/utils/definition';
import { filterNameAndLabel, removeClipFromLabels } from '../lib/utils/helper';
import { saveLabels } from '../lib/features/labels/labelsSlice';
import { saveClips } from '../lib/features/clips/clipsSlice';
import PinMessage from '../components/PinMessage';
import { Toaster } from 'react-hot-toast';

const Clips = ({loading}: {loading: boolean}) => {

  const clips: ClipInterface[] = useAppSelector((state) => state.clips.value);
  const labels: LabelInterface[] = useAppSelector((state) => state.labels.value);
  const dispatch = useAppDispatch();

  const { searchQuery } = useContext(SearchContext);

  const filteredClips = filterNameAndLabel(clips, labels, searchQuery);
  const [pinnedClips, unPinnedClips] = filteredClips.reduce((acc: [ClipInterface[], ClipInterface[]], obj) => (obj.pinned ? acc[0].push(obj) : acc[1].push(obj), acc), [[], []]);

  const removeClip = (clipID: string) => {
    const updatedClips = clips.filter(clip => clip.id !== clipID);
    const updatedLabels = removeClipFromLabels(labels, clipID);
    dispatch(saveClips(updatedClips));
    dispatch(saveLabels(updatedLabels));
    localStorage.setItem('clips', JSON.stringify(updatedClips));
    localStorage.setItem('labels', JSON.stringify(updatedLabels));
  }

  if (loading) {
    return (
      <div className='text-sm'>Getting clips...</div>
    )
  }

  return (
    <div className='w-full h-full text-sm gap-2 overflow-y-auto'
      style={{ scrollbarWidth: 'none' }}
    >
      <PinMessage msg={pinnedClips.length ? 'Pinned Items' : 'No Pinned Items'} />
      {pinnedClips.map((clip, ind) => (
        <ClipItem clip={clip} key={ind} removeClip={removeClip} />
      ))}
      <div className={`w-full my-2 bg-gray-200 dark:bg-slate-500 ${pinnedClips.length ? '' : 'hidden'}`} style={{ height: 1 }}></div>
      {unPinnedClips.map((clip, ind) => (
        <ClipItem clip={clip} key={ind} removeClip={removeClip} />
      ))}
      <Toaster />
    </div>
  )
}

export default Clips