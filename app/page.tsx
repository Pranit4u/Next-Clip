'use client'
import { useContext, useEffect, useState } from "react";
import Clips from "./ui/Clips";
import { useAppDispatch, useAppSelector } from "./lib/hooks";
import { saveClips } from "./lib/features/clips/clipsSlice";
import { saveLabels } from "./lib/features/labels/labelsSlice";
import InputClip from "./ui/InputClip";
import PinMessage from "./components/PinMessage";
import { SearchContext } from "./SearchContext";
import { HiMiniTrash } from "react-icons/hi2";
import { removeLabelFromClips } from "./lib/utils/helper";

export default function Page() {
  const [loading, setLoading] = useState(true);

  const clips = useAppSelector(state => state.clips.value);
  const labels = useAppSelector(state => state.labels.value);
  const dispatch = useAppDispatch();
  const { showLabelMenu, setSearchQuery } = useContext(SearchContext);

  useEffect(() => {
    let local_clips = JSON.parse(localStorage.getItem('clips') || '[]');
    let local_labels = JSON.parse(localStorage.getItem('labels') || '[]');
    dispatch(saveClips(local_clips));
    dispatch(saveLabels(local_labels));
    setLoading(false);
  }, []);

  const handleLabelClick = (labelName: string) => {
    setSearchQuery(labelName);
  }

  const handleDeleteLabel = (labelId: string) => {
    const updatedClips = removeLabelFromClips(clips, labelId);
    const updatedLabels = labels.filter(label => label.id !== labelId);
    dispatch(saveClips(updatedClips));
    dispatch(saveLabels(updatedLabels));
    localStorage.setItem('clips', JSON.stringify(updatedClips));
    localStorage.setItem('labels', JSON.stringify(updatedLabels));
  }

  return (
    <div className='flex gap-2 h-96 p-2 dark:text-slate-400'>
      {showLabelMenu &&
        <div className='w-2/3 bg-gray-100 dark:bg-slate-800 p-2 rounded-r-md text-xs overflow-y-auto'
          style={{ scrollbarWidth: 'none' }}
        >
          <PinMessage msg={labels.length ? 'Labels' : 'No Labels'} />
          {labels.map((label, ind) => (
            <div key={ind} className='flex h-6 items-center justify-between bg-gray-300 dark:bg-slate-700 rounded-r-md my-2 pl-1 cursor-pointer'>
              <div
                className='overflow-hidden'
                onClick={() => handleLabelClick(label.name)}
                style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              >
                {label.name}
              </div>
              <div className='aspect-square rounded-full p-1 text-gray-600 dark:text-slate-400 dark:hover:bg-slate-800 hover:bg-gray-100 cursor-pointer flex justify-center items-center'
                onClick={() => handleDeleteLabel(label.id)}
              >
                <HiMiniTrash />
              </div>
            </div>
          ))}
        </div>}
      <div className='w-full flex flex-col gap-2 items-center'>
        <InputClip />
        <Clips loading={loading} />
      </div>
    </div>
  );
}
