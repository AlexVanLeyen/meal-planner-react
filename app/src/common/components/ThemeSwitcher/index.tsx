import React, { useCallback } from "react";

export interface ThemeSwitcher {
  themes?: string[];
}

export const ThemeSwitcher: React.FC<ThemeSwitcher> = (props) => {
  const { themes = [] } = props;

  const handleThemeChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (document.firstElementChild) {
        document.firstElementChild.classList.value = event.target.value;
      }
    },
    [],
  );

  return (
    <div className="theme-switcher">
      <label>
        <div>Theme:</div>
        <div className="select">
          <select onChange={handleThemeChange}>
            {themes.map((theme) => (
              <option key={theme} value={`theme-${theme}`}>
                {theme.replaceAll("-", " ")}
              </option>
            ))}
            {themes.length == 0 && (
              <option value="" disabled>
                No Themes Available
              </option>
            )}
          </select>
        </div>
      </label>
    </div>
  );
};
