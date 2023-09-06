export interface IAppContext {
  username: string;
  language: string | null;
  updateLanguage: (lang: string) => void;
}
