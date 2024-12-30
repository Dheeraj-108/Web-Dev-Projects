(() => {
    'use strict'
  
    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  const taxSwitch = document.getElementById('flexSwitchCheckDefault');
        const listings = document.querySelectorAll('.listing-card');
    
        taxSwitch.addEventListener('change', () => {
            listings.forEach(listing => {
                const priceElement = listing.querySelector('.price-val');
                const taxInfo = listing.querySelector('.tax-info');
                const basePrice = listing.getAttribute('priceVal');
                console.log(basePrice);
                if (taxSwitch.checked) {
                    priceElement.textContent = (basePrice * 1.18).toLocaleString('en-IN');
                    taxInfo.style.display = 'inline';
                } else {
                    priceElement.textContent = basePrice.toLocaleString('en-IN');
                    taxInfo.style.display = 'none';
                }
            });
        });

        const filterIcons = document.querySelector('.filter-icons');
        const leftButton = document.querySelector('.left-btn');
        const rightButton = document.querySelector('.right-btn');

        const scrollAmount = 150;

        leftButton.addEventListener('click', () => {
            filterIcons.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        rightButton.addEventListener('click', () => {
            filterIcons.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                filterIcons.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else if (event.key === 'ArrowLeft') {
                filterIcons.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });

  