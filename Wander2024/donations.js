window.addEventListener('scroll', () => {
  let value = window.scrollY;

  // Pocetna sliki efekti
  text.style.marginTop = value * 2.5 + 'px';
  leaf.style.top = value * -1.5 + 'px';
  leaf.style.left = value * -1.5 + 'px';
  hill5.style.left = value * 1.5 + 'px';
  hill4.style.left = value * -1.5 + 'px';
  hill1.style.top = value * 1 + 'px';

  // Ogranicuvanje (za da ne se izleze nadvor od stranicata)
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  if (value > maxScroll) {
    window.scrollTo(0, maxScroll);
  }
});