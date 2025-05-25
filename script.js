(function () {

  let designers = [];

  // const designers = [
  //   {
  //     id: 1,
  //     name: 'Epic Designs',
  //     stars: 4,
  //     desc: 'Passionate team of 4 designers working out of Bangalore with an experience of 4 years.',
  //     projects: 57,
  //     years: 8,
  //     price: '$$',
  //     phone1: '+91-984532853',
  //     phone2: '+91-984532854'
  //   },
  //   {
  //     id: 2,
  //     name: 'Studio - D3',
  //     stars: 5,
  //     desc: 'Passionate team of 4 designers working out of Bangalore with an experience of 4 years.',
  //     projects: 43,
  //     years: 6,
  //     price: '$$$',
  //     phone1: '+91-984532853',
  //     phone2: '+91-984532854'
  //   },
  //   {
  //     id: 3,
  //     name: 'DesignHaus',
  //     stars: 3,
  //     desc: 'Contemporary design studio based in Mumbai with over 5 years of experience.',
  //     projects: 34,
  //     years: 5,
  //     price: '$$',
  //     phone1: '+91-9845111111',
  //     phone2: '+91-9845111112'
  //   },
  // ];
  
//from my database i am gonna fetch
fetch('/api/designers')
  .then(res => res.json())
  .then(data => {
    designers = data;
    console.log('Designers fetched:', designers);  
    render();
  })
  .catch(err => console.error('Failed to fetch designers:', err));


  const shortlistKey = 'ec-shortlisted';
  let shortlisted = JSON.parse(localStorage.getItem(shortlistKey) || '[]');

  const listingsEl = document.getElementById('listings');
  const filterBtn = document.getElementById('shortlistFilter');

  function render() {
    listingsEl.innerHTML = '';
    const tpl = document.getElementById('card-template');
    const showOnlyShortlisted = filterBtn.classList.contains('active');

    designers.forEach((d) => {
      const isShortlisted = shortlisted.includes(d.id);
      if (showOnlyShortlisted && !isShortlisted) return;

      const card = tpl.content.cloneNode(true);
      const art = card.querySelector('.card');
      art.dataset.id = d.id;

      card.querySelector('.studio-name').textContent = d.name;
      card.querySelector('.stars').textContent = '★★★★★'.slice(0, d.stars) + '☆☆☆☆☆'.slice(d.stars);
      card.querySelector('.desc').textContent = d.description;
      card.querySelector('.projects').textContent = d.projects;
      card.querySelector('.years').textContent = d.years;
      card.querySelector('.price').textContent = d.price;
      card.querySelector('.phone1').textContent = d.phone1;
      card.querySelector('.phone2').textContent = d.phone2;

      const shortlistBtn = card.querySelector('.shortlist');
      if (isShortlisted) {
        shortlistBtn.classList.add('shortlisted');
        shortlistBtn.querySelector('i').classList.replace('fa-regular', 'fa-solid');
      }

      shortlistBtn.addEventListener('click', () => toggleShortlist(d.id, shortlistBtn));
      listingsEl.appendChild(card);
    });
  }

  function toggleShortlist(id, btn) {
    const idx = shortlisted.indexOf(id);
    if (idx > -1) {
      shortlisted.splice(idx, 1);
      btn.classList.remove('shortlisted');
      btn.querySelector('i').classList.replace('fa-solid', 'fa-regular');
    } else {
      shortlisted.push(id);
      btn.classList.add('shortlisted');
      btn.querySelector('i').classList.replace('fa-regular', 'fa-solid');
    }
    localStorage.setItem(shortlistKey, JSON.stringify(shortlisted));
    if (filterBtn.classList.contains('active')) render();
  }

  filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('active');
    const icon = filterBtn.querySelector('i');
    icon.classList.toggle('fa-solid');
    icon.classList.toggle('fa-regular');
    render();
  });

  if (shortlisted.length) {
    filterBtn.classList.add('active');
    filterBtn.querySelector('i').classList.replace('fa-regular', 'fa-solid');
  }

  render();
})();
