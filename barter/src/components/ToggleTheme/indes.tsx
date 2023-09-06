import { useThemeApp } from '@app/contexts/ThemeContext';
import { light, dark, blue } from '@app/styles/themes';

export const ToggleTheme = (): JSX.Element => {
  const { handleThemeChange } = useThemeApp();

  return (
    <div className="d-flex gap-2">
      <h4>Tema: </h4>
      <button
        className="btn btn-dark"
        type="button"
        onClick={() => handleThemeChange(dark)}
      >
        Dark
      </button>
      <button
        className="btn btn-light"
        type="button"
        onClick={() => handleThemeChange(light)}
      >
        Light
      </button>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleThemeChange(blue)}
      >
        Blue
      </button>
    </div>
  );
};
