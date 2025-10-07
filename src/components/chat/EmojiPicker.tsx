/**
 * EmojiPicker - Simple emoji picker component
 */
import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '../../lib/utils';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  className?: string;
}

const EMOJI_CATEGORIES = {
  smileys: {
    name: '😊 Smileys',
    emojis: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳']
  },
  gestures: {
    name: '👍 Gestures',
    emojis: ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💪', '🦾', '🦿', '🦵', '🦶']
  },
  hearts: {
    name: '❤️ Hearts',
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❤️‍🔥', '❤️‍🩹', '💕', '💞', '💓', '💗', '💖', '💘', '💝']
  },
  objects: {
    name: '🎉 Objects',
    emojis: ['🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '🥈', '🥉', '⭐', '🌟', '✨', '💫', '💥', '🔥', '💧', '💨', '☀️', '🌙', '⚡', '☁️', '🌈']
  }
};

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, className }) => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof EMOJI_CATEGORIES>('smileys');

  const handleEmojiClick = useCallback((emoji: string) => {
    onEmojiSelect(emoji);
  }, [onEmojiSelect]);

  const categories = useMemo(() => Object.entries(EMOJI_CATEGORIES), []);

  return (
    <div 
      className={cn(
        "bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden",
        "w-80 max-h-96 flex flex-col",
        className
      )}
      role="dialog"
      aria-label="Emoji picker"
    >
      {/* Category tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
        {categories.map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key as keyof typeof EMOJI_CATEGORIES)}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              activeCategory === key
                ? "text-indigo-600 border-b-2 border-indigo-600 bg-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            )}
            aria-label={`Select ${category.name} category`}
            aria-pressed={activeCategory === key}
          >
            {category.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Emoji grid */}
      <div 
        className="flex-1 overflow-y-auto p-3"
        role="grid"
        aria-label={`${EMOJI_CATEGORIES[activeCategory].name} emojis`}
      >
        <div className="grid grid-cols-8 gap-2">
          {EMOJI_CATEGORIES[activeCategory].emojis.map((emoji, index) => (
            <button
              key={`${emoji}-${index}`}
              onClick={() => handleEmojiClick(emoji)}
              className="text-2xl hover:bg-gray-100 rounded p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={`Insert ${emoji} emoji`}
              role="gridcell"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(EmojiPicker);
