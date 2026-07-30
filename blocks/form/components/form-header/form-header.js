function getText(value, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

export default async function decorate(element, fieldJson) {
  const title = getText(
    fieldJson?.headerTitle,
    'Schedule a free consultation in 15 minutes.',
  );
  const subtitle = getText(
    fieldJson?.headerSubtitle,
    'A UPS solutions specialist will contact you shortly to schedule your virtual meeting.',
  );

  element.classList.add('form-header-wrapper');

  const banner = document.createElement('div');
  banner.className = 'form-header-banner';

  const heading = document.createElement('h2');
  heading.className = 'form-header-title';
  heading.textContent = title;

  banner.append(heading);

  if (subtitle) {
    const text = document.createElement('p');
    text.className = 'form-header-subtitle';
    text.textContent = subtitle;
    banner.append(text);
  }

  element.replaceChildren(banner);
  return element;
}
