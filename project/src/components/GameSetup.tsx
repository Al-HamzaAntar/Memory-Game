import React, { useState } from 'react';
import { validateSetupName } from '../utils/nameValidator';
import { Plus, Play, X, ListPlus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GameSetupProps {
  onGameStart: (names: string[]) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onGameStart }) => {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBatchMode, setIsBatchMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBatchMode) {
      const nameList = name
        .split('-')
        .map(n => n.trim())
        .filter(n => n.length > 0);
      
      const newNames = new Set<string>();
      const invalidNames = new Set<string>();
      
      nameList.forEach(n => {
        const normalizedName = n;
        if (names.includes(normalizedName)) {
          invalidNames.add(n);
        } else {
          newNames.add(normalizedName);
        }
      });
      
      if (invalidNames.size > 0) {
        setError(t('setup.error.duplicate', Array.from(invalidNames).join(' ')));
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
        return;
      }
      
      setNames(prev => [...prev, ...Array.from(newNames)]);
      setName('');
      setError('');
    } else {
      const validation = validateSetupName(name, names);
      
      if (validation.isValid) {
        setNames(prev => [...prev, name.trim()]);
        setName('');
        setError('');
      } else {
        setError(validation.message);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
      }
    }
  };

  const removeName = (nameToRemove: string) => {
    setNames(names.filter(n => n !== nameToRemove));
  };

  const handleGameStart = () => {
    if (names.length < 2) {
      setError(t('setup.error.min_names'));
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
      return;
    }
    onGameStart(names);
  };

  const toggleMode = () => {
    setIsBatchMode(!isBatchMode);
    setName('');
    setError('');
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-amber-800 mb-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {t('setup.title')}
        </h2>
        
        <div className="mb-4">
          <button
            onClick={toggleMode}
            className="w-full flex items-center justify-center px-4 py-2 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition-colors duration-300 mb-4"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <ListPlus size={16} className={language === 'ar' ? 'ml-2' : 'mr-2'} />
            {t(isBatchMode ? 'setup.single.mode' : 'setup.batch.mode')}
          </button>
          
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 rounded-md border ${
                  error ? 'border-red-500 bg-red-50' : 
                  'border-gray-300 focus:border-amber-500'
                } focus:outline-none transition-all duration-300 ${
                  language === 'ar' ? 'text-right' : 'text-left'
                }`}
                placeholder={t(isBatchMode ? 'setup.placeholder.batch' : 'setup.placeholder.single')}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
              
              <button
                type="submit"
                className={`absolute ${language === 'ar' ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 bg-amber-600 text-white p-1.5 rounded-full hover:bg-amber-700 transition-colors duration-300`}
                aria-label={t('setup.add_name')}
              >
                <Plus size={16} />
              </button>
            </div>
            
            {error && (
              <div 
                className={`mt-2 text-red-500 text-sm ${language === 'ar' ? 'text-right' : 'text-left'} ${isAnimating ? 'animate-shake' : ''}`}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                {error}
              </div>
            )}
          </form>
        </div>

        <div className="mb-6">
          <h3 
            className={`text-sm font-medium text-amber-700 mb-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            {t('setup.hidden.names')}
          </h3>
          <div className={`flex flex-wrap gap-2 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
            {names.map((name) => (
              <span 
                key={name}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-amber-100 text-amber-800"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                {name}
                <button
                  onClick={() => removeName(name)}
                  className={`${language === 'ar' ? 'mr-1' : 'ml-1'} text-amber-600 hover:text-amber-800`}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            {names.length === 0 && (
              <p 
                className={`text-gray-500 text-sm italic ${language === 'ar' ? 'text-right' : 'text-left'}`}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                {t('setup.no.names')}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleGameStart}
          className="w-full flex items-center justify-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors duration-300"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          <Play size={16} className={language === 'ar' ? 'ml-2' : 'mr-2'} />
          {t('setup.start.game')}
        </button>
      </div>
    </div>
  );
};

export default GameSetup;