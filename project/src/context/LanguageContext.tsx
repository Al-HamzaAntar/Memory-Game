import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'app.title': 'Memory Game',
    'app.subtitle': "Let's hide some fun names for players to find! 🎯",
    'app.subtitle.playing': 'Can you find all {0} hidden names? 🎨',
    'setup.title': 'Set Up Hidden Names',
    'setup.batch.mode': 'Switch to Batch Mode',
    'setup.single.mode': 'Switch to Single Name Mode',
    'setup.placeholder.batch': 'Enter names separated by hyphens...',
    'setup.placeholder.single': 'Enter a name to hide...',
    'setup.hidden.names': 'Hidden Names:',
    'setup.no.names': 'No names added yet',
    'setup.start.game': 'Start Game',
    'setup.add_name': 'Add Name',
    'setup.error.duplicate': 'This name is already in the list: ',
    'setup.error.min_names': 'Please add at least 2 names to start the game',
    'guess.title': 'Make a Guess',
    'guess.placeholder': 'Enter a name...',
    'guess.submit': 'Submit guess',
    'guess.correct': 'Correct guess!',
    'guess.incorrect': 'Keep trying!',
    'guess.already_tried': "You've already tried this name",
    'guess.empty': 'Please enter a name',
    'progress.title': 'Progress',
    'progress.no.guesses': 'No correct guesses yet. Keep trying! 🌟',
    'progress.complete': 'Hooray! You Won!',
    'progress.found.all': 'You found all the hidden names!',
    'footer.case': '✨ Names are not case-sensitive ✨',
    'footer.once': '🌟 Each guess can only be used once 🌟',
  },
  ar: {
    'app.title': 'لعبة الذاكرة',
    'app.subtitle': 'هيا نخفي بعض الأسماء الممتعة ليجدها اللاعبون! 🎯',
    'app.subtitle.playing': 'هل يمكنك العثور على {0} أسماء مخفية؟ 🎨',
    'setup.title': 'إعداد الأسماء المخفية',
    'setup.batch.mode': 'التبديل إلى وضع المجموعة',
    'setup.single.mode': 'التبديل إلى وضع الاسم الفردي',
    'setup.placeholder.batch': 'أدخل الأسماء مفصولة بعلامة الشرطة (-)',
    'setup.placeholder.single': 'أدخل اسماً لإخفائه...',
    'setup.hidden.names': 'الأسماء المخفية:',
    'setup.no.names': 'لم تتم إضافة أسماء بعد',
    'setup.start.game': 'ابدأ اللعبة',
    'setup.add_name': 'إضافة اسم',
    'setup.error.duplicate': 'هذا الاسم موجود بالفعل في القائمة: ',
    'setup.error.min_names': 'الرجاء إضافة اسمين على الأقل لبدء اللعبة',
    'guess.title': 'قم بالتخمين',
    'guess.placeholder': 'أدخل اسماً...',
    'guess.submit': 'أرسل التخمين',
    'guess.correct': 'تخمين صحيح!',
    'guess.incorrect': 'حاول مرة أخرى!',
    'guess.already_tried': 'لقد جربت هذا الاسم من قبل',
    'guess.empty': 'الرجاء إدخال اسم',
    'progress.title': 'التقدم',
    'progress.no.guesses': 'لا توجد تخمينات صحيحة بعد. واصل المحاولة! 🌟',
    'progress.complete': 'تهانينا! لقد فزت!',
    'progress.found.all': 'لقد وجدت جميع الأسماء المخفية!',
    'footer.case': '✨ الأسماء غير حساسة لحالة الأحرف ✨',
    'footer.once': '🌟 يمكن استخدام كل تخمين مرة واحدة فقط 🌟',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string, ...args: any[]): string => {
    let translation = translations[language][key] || key;
    args.forEach((arg, i) => {
      translation = translation.replace(`{${i}}`, arg);
    });
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};