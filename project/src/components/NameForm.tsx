import React, { useState } from 'react';
import { validateName } from '../utils/nameValidator';
import { Search, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NameFormProps {
  usedNames: string[];
  secretNames: string[];
  onGuessSubmitted: (name: string, isCorrect: boolean) => void;
}

const NameForm: React.FC<NameFormProps> = ({ 
  usedNames, 
  secretNames,
  onGuessSubmitted 
}) => {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateName(name, usedNames, secretNames, t);
    
    if (validation.isValid) {
      setMessage(validation.message);
      setIsSuccess(validation.isCorrect || false);
      onGuessSubmitted(name.trim(), validation.isCorrect || false);
      setName('');
    } else {
      setMessage(validation.message);
      setIsSuccess(false);
    }
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="w-full max-w-md">
      <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 
          className="text-xl font-semibold text-amber-800 mb-4"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {t('guess.title')}
        </h2>
        
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-2 rounded-md border ${
              message && !isSuccess ? 'border-red-500 bg-red-50' : 
              isSuccess ? 'border-green-500 bg-green-50' : 
              'border-gray-300 focus:border-amber-500'
            } focus:outline-none transition-all duration-300 ${
              language === 'ar' ? 'text-right' : 'text-left'
            }`}
            placeholder={t('guess.placeholder')}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
          
          <button
            type="submit"
            className={`absolute ${language === 'ar' ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 bg-amber-600 text-white p-1.5 rounded-full hover:bg-amber-700 transition-colors duration-300`}
            aria-label={t('guess.submit')}
          >
            <Search size={16} />
          </button>
        </div>
        
        {message && (
          <div 
            className={`mt-2 flex items-center ${
              isSuccess ? 'text-green-500' : 'text-red-500'
            } ${isAnimating ? 'animate-shake' : ''} ${
              language === 'ar' ? 'justify-end' : 'justify-start'
            }`}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            {isSuccess ? (
              <CheckCircle size={16} className={language === 'ar' ? 'ml-1' : 'mr-1'} />
            ) : (
              <AlertCircle size={16} className={language === 'ar' ? 'ml-1' : 'mr-1'} />
            )}
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default NameForm;