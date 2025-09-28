'use client';

import { useState, KeyboardEvent } from 'react';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export function TagInput({ value: tags, onChange: setTags }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 p-2 mb-2 border rounded-md min-h-[40px]">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-2 font-bold text-white hover:text-gray-200"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tags (press Enter or ,)"
        className="w-full p-2 border rounded"
      />
       <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add a tag.</p>
    </div>
  );
}