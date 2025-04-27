import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className={`fixed ${language === 'ar' ? 'left-4' : 'right-4'} top-4 bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 transition-colors duration-300 shadow-lg`}
      aria-label="Toggle language"
    >
      <Languages size={24} />
    </button>
  );
};

export default LanguageToggle;