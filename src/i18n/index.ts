import en from './en.json';
import am from './am.json';
import om from './om.json';
import { LanguageCode } from '../types';

export const translations: Record<LanguageCode, typeof en> = {
  en,
  am,
  om,
};

export function getTranslation(lang: LanguageCode) {
  return translations[lang] || translations.en;
}
