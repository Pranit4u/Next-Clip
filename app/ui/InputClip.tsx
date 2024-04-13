import React, { useContext, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { saveClips } from '../lib/features/clips/clipsSlice';
import { convertClip, convertLabel } from '../lib/utils/helper';
import { saveLabels } from '../lib/features/labels/labelsSlice';
import AddClipFooter from '../components/AddClipFooter';
import { SearchContext } from '../SearchContext';

const InputClip = () => {
  const [clipText, setClipText] = useState<string>('');
  const [labelTextArray, setLabelTextArray] = useState<string[]>([]);
  const [labelText, setLabelText] = useState<string>('');
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {setShowLabelMenu} = useContext(SearchContext);

  const clips = useAppSelector(state => state.clips.value);
  const labels = useAppSelector(state => state.labels.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [labelText]);

  const handleClipTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setClipText(e.target.value);
  }

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelText(e.target.value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' && labelText.trim() !== '') {
      e.preventDefault();
      if (!labelTextArray.includes(labelText.trim())) {
        setLabelTextArray(prev => [...prev, labelText.trim()]);
      }
      setLabelText('');
      return;
    }
    if (e.key === 'Backspace' && labelText === '') {
      setLabelTextArray(prev => prev.slice(0, -1));
      return;
    }
  }

  const handleFocus = () => {
    setShowLabelMenu(false);
    setShowMoreOptions(true);
  }

  const handleSave = () => {
    setShowMoreOptions(false);
    if (!clipText) {
      return;
    }
    const allLabelIDs: string[] = [];
    const newClipObj = convertClip(clipText);
    const newLabelObjs = labelTextArray.map(labelText => {
      if (!labels.find(labelObj => labelObj.name === labelText)) {
        const newLabelObj = convertLabel(labelText, [newClipObj.id]);
        allLabelIDs.push(newLabelObj.id);
        return newLabelObj;
      } else {
        return undefined;
      }
    }).filter(labelObj => labelObj !== undefined);
    const oldUpdatedLabelObjs = labels.map(labelObj => {
      if (labelTextArray.includes(labelObj.name)) {
        allLabelIDs.push(labelObj.id);
        return { ...labelObj, clipIDs: [...labelObj.clipIDs, newClipObj.id] };
      }
      return labelObj;
    });
    newClipObj.labelIDs = allLabelIDs;
    const allLabelObjs = [...oldUpdatedLabelObjs, ...newLabelObjs];
    const allClipObjs = [...clips, newClipObj]
    dispatch(saveClips(allClipObjs));
    dispatch(saveLabels(allLabelObjs));
    localStorage.setItem('clips', JSON.stringify(allClipObjs));
    localStorage.setItem('labels', JSON.stringify(allLabelObjs));
    setClipText('');
    setLabelTextArray([]);
  }

  return (
    <div className='w-4/5 my-1 flex flex-col rounded-md p-2 dark:border dark:border-slate-600'
      style={{ boxShadow: '0px 0px 2px 2px rgba(0,0,0,0.2)' }}
    >
      <textarea className='focus:outline-none w-full text-sm bg-transparent font-medium placeholder-gray-600 dark:placeholder-gray-500'
        style={{ resize: 'none', scrollbarWidth: 'none' }}
        placeholder='Pin a text'
        onChange={handleClipTextChange}
        value={clipText}
        onFocus={handleFocus}
        rows={Math.min(clipText.split('\n').length, 5)}
      />
      {showMoreOptions && <div>
        <div className='w-full gap-0.5 flex items-center text-xs overflow-x-auto'
          style={{scrollbarWidth: 'none'}}
        >
            {labelTextArray.map((labelText, index) => (
              <label
                key={index}
                className='bg-gray-200 dark:bg-slate-800 px-1 rounded-md cursor-pointer'
              >
                {labelText}
              </label>
            ))}
          <input className={`focus:outline-none py-2 font-medium min-w-20 w-full text-xs bg-transparent placeholder-gray-500`}
            style={{ resize: 'none', scrollbarWidth: 'none' }}
            placeholder={`${labelTextArray.length > 0 ? '' : 'Add tags... e.g. password'}`}
            value={labelText}
            onChange={handleLabelChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
          />
        </div>
        <AddClipFooter handleSave={handleSave} />
      </div>}
    </div>
  )
}

export default InputClip