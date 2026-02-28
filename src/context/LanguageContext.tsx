import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, TRANSLATIONS } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (path: string): string => {
    const keys = path.split('.');
    let result = TRANSLATIONS[language];
    
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        // Fallback to English if translation is missing
        let fallback = TRANSLATIONS['en'];
        for (const fKey of keys) {
          if (fallback && fallback[fKey]) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        return typeof fallback === 'string' ? fallback : path;
      }
    }
    
    return typeof result === 'string' ? result : path;
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
