import React, { useState } from 'react';
import NameForm from './components/NameForm';
import GameProgress from './components/GameProgress';
import GameSetup from './components/GameSetup';
import LanguageToggle from './components/LanguageToggle';
import { Brain } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

function App() {
  const { t, language } = useLanguage();
  const [isSetup, setIsSetup] = useState(true);
  const [secretNames, setSecretNames] = useState<string[]>([]);
  const [usedNames, setUsedNames] = useState<string[]>([]);
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const gameComplete = correctGuesses.length === secretNames.length;

  const handleGameStart = (names: string[]) => {
    setSecretNames(names);
    setIsSetup(false);
  };

  const handleGuessSubmitted = (name: string, isCorrect: boolean) => {
    setUsedNames(prev => [...prev, name]);
    if (isCorrect) {
      setCorrectGuesses(prev => [...prev, name]);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 flex flex-col items-center justify-center p-4 ${language === 'ar' ? 'font-arabic' : 'font-english'}`}>
      <LanguageToggle />
      <div className="w-full max-w-md text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-amber-600 text-white rounded-full mb-4 shadow-lg">
          <Brain size={32} />
        </div>
        <h1 className="text-4xl font-bold text-amber-800 mb-3" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {t('app.title')}
        </h1>
        <p className="text-amber-700 text-lg" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {isSetup ? t('app.subtitle') : t('app.subtitle.playing', secretNames.length)}
        </p>
      </div>
      
      {isSetup ? (
        <GameSetup onGameStart={handleGameStart} />
      ) : (
        <>
          <NameForm 
            usedNames={usedNames}
            secretNames={secretNames}
            onGuessSubmitted={handleGuessSubmitted}
          />
          
          <GameProgress 
            correctGuesses={correctGuesses}
            totalRequired={secretNames.length}
            gameComplete={gameComplete}
          />
        </>
      )}
      
      <footer className="mt-10 text-center text-amber-700 text-sm" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <p>{t('footer.case')}</p>
        <p>{t('footer.once')}</p>
      </footer>
    </div>
  );
}

export default App;