import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { getPrismTheme, languageLabel } from '../utils/highlight';
import CopyButton from './CopyButton';

export default function CodeBlock({ value, language = 'tsx' }: { value: string; language?: keyof typeof languageLabel }) {
  const [theme, setTheme] = React.useState<any>(null);

  // Lazy-load theme (helps bundle size)
  React.useEffect(() => { getPrismTheme().then(setTheme); }, []);

  return (
    <div className="relative group">
      <div className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={value} />
      </div>
      <div className="absolute left-3 top-3 z-10 text-xs text-gray-400 uppercase">{languageLabel[language]}</div>
      {theme && (
        <Highlight {...defaultProps} code={value.trim()} language={language as any} theme={theme}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} rounded-lg p-4 overflow-auto`} style={style}>
              {tokens.map((line, i) => (
                <div key={i} className="table w-full">
                  <span className="table-cell w-8 select-none text-gray-500 pr-4 text-right">{i + 1}</span>
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      )}
    </div>
  );
}
