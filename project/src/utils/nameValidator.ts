// Helper function to normalize Arabic text
const normalizeArabicText = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    // Remove diacritics (tashkeel)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Normalize alef variations
    .replace(/[آأإٱ]/g, 'ا')
    // Normalize hamza variations
    .replace(/[ؤئ]/g, 'ء')
    // Normalize ya variations
    .replace(/[ىي]/g, 'ي')
    // Normalize ta marbuta
    .replace(/[ة]/g, 'ه');
};

export const validateName = (
  name: string,
  usedNames: string[],
  secretNames: string[],
  t: (key: string) => string
): ValidationResult => {
  const normalizedName = normalizeArabicText(name);
  
  if (!normalizedName) {
    return {
      isValid: false,
      message: t('guess.empty'),
      isCorrect: false
    };
  }

  // Compare with normalized versions of used names
  if (usedNames.some(usedName => normalizeArabicText(usedName) === normalizedName)) {
    return {
      isValid: false,
      message: t('guess.already_tried'),
      isCorrect: false
    };
  }

  // Compare with normalized versions of secret names
  const isCorrectGuess = secretNames.some(
    secretName => normalizeArabicText(secretName) === normalizedName
  );
  
  return {
    isValid: true,
    message: isCorrectGuess ? t('guess.correct') : t('guess.incorrect'),
    isCorrect: isCorrectGuess
  };
};

export const validateSetupName = (
  name: string, 
  existingNames: string[],
  t: (key: string) => string
): ValidationResult => {
  const normalizedName = normalizeArabicText(name);
  
  if (!normalizedName) {
    return {
      isValid: false,
      message: t('guess.empty'),
    };
  }

  // Compare with normalized versions of existing names
  if (existingNames.some(existingName => normalizeArabicText(existingName) === normalizedName)) {
    return {
      isValid: false,
      message: t('setup.error.duplicate'),
    };
  }

  return {
    isValid: true,
    message: '',
  };
};