window.onload = function() {
  // Initialize date picker with today's date
  let datePicker = document.getElementById('visit-date');
  datePicker.valueAsDate = new Date();

  // Initialize time picker
  let startTimePicker = document.getElementById('start-time');
  let endTimePicker = document.getElementById('end-time');
  endTimePicker.disabled = true;

  startTimePicker.addEventListener('change', function() {
    endTimePicker.disabled = false;
    let startTime = parseInt(startTimePicker.value.split(':')[0]);
    for (let i = 0; i < endTimePicker.options.length; i++) {
      let endTime = parseInt(endTimePicker.options[i].value.split(':')[0]);
      if (endTime <= startTime) {
        endTimePicker.options[i].disabled = true;
      } else {
        endTimePicker.options[i].disabled = false;
      }
    }
    updateTable();
  });

  endTimePicker.addEventListener('change', function() {
    updateTable();
  });

  // Initialize guest count
  let incrementButtons = document.getElementsByClassName('increment');
  let decrementButtons = document.getElementsByClassName('decrement');

  for (let i = 0; i < incrementButtons.length; i++) {
    incrementButtons[i].addEventListener('click', function() {
      let category = this.getAttribute('data-category');
      let countSpan = document.getElementById('count-' + category);
      countSpan.textContent = parseInt(countSpan.textContent) + 1;
      updateTable();
    });

    decrementButtons[i].addEventListener('click', function() {
      let category = this.getAttribute('data-category');
      let countSpan = document.getElementById('count-' + category);
      if (parseInt(countSpan.textContent) > 0) {
        countSpan.textContent = parseInt(countSpan.textContent) - 1;
      }
      updateTable();
    });
  }

  // Update table initially
  updateTable();
}

function updateTable() {
  let guestCategories = document.getElementsByClassName('guest-category');
  let total = 0;

  for (let i = 0; i < guestCategories.length; i++) {
    let category = guestCategories[i].getElementsByTagName('label')[0].htmlFor;
    let count = guestCategories[i].getElementsByClassName('count')[0].textContent;
    let price = getPrice(category);
    let totalForCategory = count * price;

    if (count > 0) {
      document.getElementById('table-' + category + '-category').textContent = count + ' ' + category.replace('-', ' ');
      document.getElementById('table-' + category).textContent = '$' + totalForCategory;
    } else {
      document.getElementById('table-' + category + '-category').textContent = '';
      document.getElementById('table-' + category).textContent = '';
    }

    total += totalForCategory;
  }

  // Update date and time in the table
  let date = document.getElementById('visit-date').value;
  let startTime = document.getElementById('start-time').value;
  let endTime = document.getElementById('end-time').value;

  document.getElementById('table-date').textContent = date;
  document.getElementById('table-time').textContent = startTime + ' to ' + endTime;

  document.getElementById('table-total').textContent = '$' + total;
}

function getPrice(category) {
  let prices = {
    'sl-adult': 4,
    'sl-child': 2,
    'foreigner-adult': 10,
    'foreigner-child': 5,
    'infant': 0
  };

  return prices[category];
}
