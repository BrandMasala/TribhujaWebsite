import React from 'react';

const SectionGate = ({ num, word, en, theme = 'dark', isLogo = false }) => {
  return (
    <div className="section-gate" data-theme={theme}>
      <div className="section-gate-num">{num}</div>
      <div className="section-gate-word">
        {isLogo ? (
          <img 
            src="/assets/images/logo.png" 
            alt="Tribhuja" 
            style={{ height: 'clamp(4rem, 12vw, 10rem)', width: 'auto', display: 'block', margin: '0 auto' }} 
          />
        ) : (
          word
        )}
      </div>
      <div className="section-gate-en">{en}</div>
      <div className="section-gate-rule"></div>
    </div>
  );
};

export default SectionGate;
