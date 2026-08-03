import { stripTags } from '../../util.js';

function getText(value, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function applyStyleProp(el, cssVar, value) {
  if (typeof value === 'string' && value.trim()) {
    el.style.setProperty(cssVar, value.trim());
  }
}

export default async function decorate(element, fieldJson) {
  const title = getText(fieldJson?.headerTitle);
  const subtitle = getText(fieldJson?.headerSubtitle);

  element.classList.add('form-header-wrapper');

  const banner = document.createElement('div');
  banner.className = 'form-header-banner';

  if (title) {
    const heading = document.createElement('h2');
    heading.className = 'form-header-title';
    heading.innerHTML = stripTags(title);
    banner.append(heading);
  }

  if (subtitle) {
    const text = document.createElement('p');
    text.className = 'form-header-subtitle';
    text.innerHTML = stripTags(subtitle);
    banner.append(text);
  }

  applyStyleProp(banner, '--form-header-bg', fieldJson?.headerBackgroundColor);
  applyStyleProp(banner, '--form-header-color', fieldJson?.headerTextColor);
  applyStyleProp(banner, '--form-header-border-color', fieldJson?.headerBorderColor);
  applyStyleProp(banner, '--form-header-border-width', fieldJson?.headerBorderWidth);
  applyStyleProp(banner, '--form-header-border-style', fieldJson?.headerBorderStyle);
  applyStyleProp(banner, '--form-header-radius', fieldJson?.headerBorderRadius);
  applyStyleProp(banner, '--form-header-padding', fieldJson?.headerPadding);
  applyStyleProp(banner, '--form-header-align', fieldJson?.headerTextAlign);
  applyStyleProp(banner, '--form-header-title-size', fieldJson?.headerTitleFontSize);
  applyStyleProp(banner, '--form-header-subtitle-size', fieldJson?.headerSubtitleFontSize);
  applyStyleProp(banner, '--form-header-title-weight', fieldJson?.headerTitleFontWeight);
  applyStyleProp(banner, '--form-header-subtitle-weight', fieldJson?.headerSubtitleFontWeight);

  element.replaceChildren(banner);
  return element;
}
