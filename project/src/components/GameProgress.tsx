import React from 'react';
import { Trophy, Star, GripHorizontal, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface GameProgressProps {
  correctGuesses: string[];
  totalRequired: number;
  gameComplete: boolean;
}

interface SortableItemProps {
  id: string;
}

const SortableItem: React.FC<SortableItemProps> = ({ id }) => {
  const { language } = useLanguage();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="animate-fade-in flex items-center px-3 py-2 bg-amber-50 rounded-md border border-amber-200 cursor-move group hover:bg-amber-100 transition-colors"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div {...attributes} {...listeners} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-amber-500 opacity-50 group-hover:opacity-100`}>
        <GripHorizontal size={16} />
      </div>
      <Star size={16} className={`text-amber-500 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
      <span className="capitalize text-amber-800">{id}</span>
    </div>
  );
};

const GameProgress: React.FC<GameProgressProps> = ({
  correctGuesses,
  totalRequired,
  gameComplete,
}) => {
  const { t, language } = useLanguage();
  const [items, setItems] = React.useState(correctGuesses);
  const [showScrollButton, setShowScrollButton] = React.useState(false);

  React.useEffect(() => {
    setItems(correctGuesses);
  }, [correctGuesses]);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-md mt-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-amber-200">
        <div 
          className="flex items-center justify-between mb-4"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          <h2 className="text-2xl font-bold text-amber-800">{t('progress.title')}</h2>
          <div className="flex items-center text-amber-600">
            <Trophy size={24} className={language === 'ar' ? 'ml-2' : 'mr-2'} />
            <span className="text-xl font-bold">{correctGuesses.length}/{totalRequired}</span>
          </div>
        </div>

        {gameComplete ? (
          <div 
            className="text-center py-4"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-amber-800 mb-2">
              {t('progress.complete')}
            </h3>
            <p className="text-amber-700">
              {t('progress.found.all')}
            </p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="space-y-2">
              <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {items.map((name) => (
                  <SortableItem key={name} id={name} />
                ))}
              </SortableContext>
              {items.length === 0 && (
                <p 
                  className="text-amber-700 text-lg italic text-center py-4"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  {t('progress.no.guesses')}
                </p>
              )}
            </div>
          </DndContext>
        )}
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 ${language === 'ar' ? 'left-8' : 'right-8'} bg-amber-600 text-white p-4 rounded-full shadow-lg hover:bg-amber-700 transition-colors duration-300 animate-bounce`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default GameProgress;