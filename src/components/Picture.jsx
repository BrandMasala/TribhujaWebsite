import React from 'react';

const withWebp = (src) =>
  typeof src === 'string'
    ? src.replace(/\.(jpe?g|png)(\?.*)?$/i, '.webp$2')
    : src;

const withMobileWebp = (src) => {
  if (typeof src !== 'string') return src;
  if (/-mobile\.webp(\?.*)?$/i.test(src)) return src;
  return src.replace(/\.(jpe?g|png|webp)(\?.*)?$/i, '-mobile.webp$2');
};

const Picture = React.forwardRef(function Picture(
  {
    src,
    mobileSrc,
    alt = '',
    loading = 'lazy',
    decoding = 'async',
    sizes,
    sourceProps,
    mobileBreakpoint = '(max-width: 768px)',
    ...rest
  },
  ref
) {
  // Guard against falsy src so we never render <img src="">.
  if (!src || typeof src !== 'string' || src.trim() === '') {
    return null;
  }

  const webp = withWebp(src);
  // Prefer the explicit mobileSrc, fall back to auto-derivation.
  const resolvedMobile = mobileSrc && typeof mobileSrc === 'string' && mobileSrc.trim() !== ''
    ? mobileSrc
    : withMobileWebp(src);
  const hasLegacyFallback = webp !== src;
  const emitMobile = !sourceProps && resolvedMobile && resolvedMobile !== src;

  return (
    <picture>
      {emitMobile && (
        <source
          media={mobileBreakpoint}
          srcSet={resolvedMobile}
          type={
            /\.png(\?.*)?$/i.test(resolvedMobile) ? 'image/png' :
            /\.jpe?g(\?.*)?$/i.test(resolvedMobile) ? 'image/jpeg' :
            'image/webp'
          }
        />
      )}
      {hasLegacyFallback && (
        <source srcSet={webp} type="image/webp" sizes={sizes} {...sourceProps} />
      )}
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        {...rest}
      />
    </picture>
  );
});

export default Picture;
export { withWebp, withMobileWebp };
