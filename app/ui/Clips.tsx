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
import TooltipContent from '../components/TooltipContent';

const Clips = ({ loading }: { loading: boolean }) => {

  const clips: ClipInterface[] = useAppSelector((state) => state.clips.value);
  const labels: LabelInterface[] = useAppSelector((state) => state.labels.value);
  const dispatch = useAppDispatch();

  const { searchQuery, tooltipObject, setTooltipObject } = useContext(SearchContext);

  const filteredClips = filterNameAndLabel(clips, labels, searchQuery)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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
    <div className='w-full h-full flex flex-col gap-2 text-sm gap-2 overflow-y-auto'
      style={{ scrollbarWidth: 'none' }}
      data-tooltip-id='clips-tooltip'
    >
      {filteredClips.length === 0 ? <PinMessage msg={'No Items'} /> : <></>}
      <div>
        {pinnedClips.length ? <PinMessage msg={'Pinned Items'} /> : <></>}
        {pinnedClips.map((clip, ind) => (
          <ClipItem clip={clip} key={ind} removeClip={removeClip} />
        ))}
      </div>
      <div>
        {unPinnedClips.length ? <PinMessage msg={'Unpinned Items'} /> : <></>}
        {unPinnedClips.map((clip, ind) => (
          <ClipItem clip={clip} key={ind} removeClip={removeClip} />
        ))}
      </div>
      {tooltipObject.clips && 
        <TooltipContent id='clips-tooltip' data='Once added, clips will appear here. Click the clips to copy.' place='top' 
          onNext={() => setTooltipObject(prev => ({ ...prev, clips: false, labelOption: true }))}/>}
      <Toaster />
    </div>
  )
}

export default Clips