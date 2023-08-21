import React, { FC } from 'react';
import {
  FeatureTogglesPortal,
  FeatureTogglesThemeContext,
  i18nFeatureTogglesPortal,
} from '../packages/Open_TE_FeatureTogglesPortal_UI/src';
import theme, {
  locale,
} from '../packages/Open_TE_FeatureTogglesPortal_TE_Theme/src';
import '@true-engineering/ui-kit-true-engineering-theme/dist/style.css';

i18nFeatureTogglesPortal.addResourceBundle('en', 'themed', locale.en);
i18nFeatureTogglesPortal.addResourceBundle('ru', 'themed', locale.ru);

export const App: FC = () => (
  <FeatureTogglesThemeContext.Provider value={{ theme }}>
    <FeatureTogglesPortal theme={theme} />
  </FeatureTogglesThemeContext.Provider>
);
