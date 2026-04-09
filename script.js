// ===== NAVBAR TOGGLE (Mobile) =====
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('open');
}

// ===== SYMPTOM CHECKER =====
function checkSymptoms() {
  const checkboxes = document.querySelectorAll('.symptoms-list input[type="checkbox"]:checked');
  const selected = [];
  checkboxes.forEach(cb => selected.push(cb.value));

  if (selected.length === 0) {
    alert('Please select at least one symptom! 😊');
    return;
  }

  const resultBox = document.getElementById('resultBox');
  const resultTitle = document.getElementById('resultTitle');
  const resultText = document.getElementById('resultText');
  resultBox.style.display = 'block';

  let disease = '';
  let advice = '';

  if (selected.includes('fever') && selected.includes('body_ache') && selected.includes('cough')) {
    disease = '🌡️ Possible: Flu (Influenza)';
    advice = 'You may have the flu. Symptoms include fever, body ache, and cough. Rest well, drink lots of fluids, and consider seeing a doctor for antiviral medication.';
  } else if (selected.includes('runny_nose') && selected.includes('sore_throat') && !selected.includes('body_ache')) {
    disease = '🤧 Possible: Common Cold';
    advice = 'Looks like a common cold. Stay warm, drink warm fluids, get rest. It usually resolves in 7-10 days without treatment.';
  } else if (selected.includes('nausea') && selected.includes('vomiting') && selected.includes('diarrhea')) {
    disease = '🤢 Possible: Food Poisoning';
    advice = 'You may have food poisoning. Stay hydrated with water and electrolytes. Avoid solid food for a few hours. See a doctor if symptoms are severe.';
  } else if (selected.includes('headache') && selected.includes('nausea') && selected.includes('dizziness')) {
    disease = '🤕 Possible: Migraine';
    advice = 'These symptoms suggest a migraine. Rest in a dark, quiet room. Over-the-counter pain relievers may help. Consult a doctor for recurring migraines.';
  } else if (selected.includes('fever') && selected.includes('chills') && selected.includes('fatigue')) {
    disease = '🦟 Possible: Malaria or Typhoid';
    advice = 'Fever with chills and fatigue can indicate malaria or typhoid. Please see a doctor immediately for a blood test and proper treatment.';
  } else if (selected.includes('chest_pain') && selected.includes('shortness_breath')) {
    disease = '🫀 Warning: Possible Heart Issue';
    advice = 'Chest pain with shortness of breath can be serious. Please seek emergency medical help immediately. Call 1122 (Pakistan Emergency).';
  } else {
    disease = '😷 General Illness Detected';
    advice = 'Based on your symptoms, you may have a general illness. Rest, stay hydrated, and monitor your condition. If symptoms worsen, please visit a doctor.';
  }

  resultTitle.textContent = disease;
  resultText.textContent = advice;

  // Step 6: Disease ke hisaab se image dikhao
  const imgMap = {
    'flu':     'https://images.unsplash.com/photo-1609743522653-52354461eb27?w=300&q=80',
    'cold':    'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=300&q=80',
    'food':    'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=300&q=80',
    'migraine':'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300&q=80',
    'malaria': 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=300&q=80',
    'heart':   'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=300&q=80',
    'general': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&q=80'
  };

  // Disease type detect karo
  let imgKey = 'general';
  if (disease.includes('Flu'))      imgKey = 'flu';
  else if (disease.includes('Cold')) imgKey = 'cold';
  else if (disease.includes('Food')) imgKey = 'food';
  else if (disease.includes('Migraine')) imgKey = 'migraine';
  else if (disease.includes('Malaria')) imgKey = 'malaria';
  else if (disease.includes('Heart')) imgKey = 'heart';

  const resultImg = document.getElementById('resultImg');
  resultImg.src = imgMap[imgKey];
  resultImg.style.display = 'block';

  resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===== DISEASES FILTER =====
function filterDiseases(category, clickedBtn) {
  const allBtns = document.querySelectorAll('.filter-btn');
  allBtns.forEach(btn => btn.classList.remove('active'));
  clickedBtn.classList.add('active');

  const cards = document.querySelectorAll('.disease-card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-cat') === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// ===== MEDICINES FILTER =====
// Ye function medicine cards ko category ke hisaab se filter karta hai
function filterMeds(category, clickedBtn) {
  // Step 1: Saare buttons se active class hata do
  const allBtns = document.querySelectorAll('.filter-btn');
  allBtns.forEach(btn => btn.classList.remove('active'));
  // Step 2: Clicked button active karo
  clickedBtn.classList.add('active');

  // Step 3: Saari medicine cards dhundo aur filter karo
  const cards = document.querySelectorAll('.med-card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-cat') === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// ===== BMI CALCULATOR =====
// Ye function weight aur height se BMI calculate karta hai
function calculateBMI() {
  // Step 1: Input values uthao
  const weight = parseFloat(document.getElementById('weight').value); // kg
  const height = parseFloat(document.getElementById('height').value); // cm
  const errorDiv = document.getElementById('bmiError');

  // Step 2: Validation — values sahi honi chahiye
  if (!weight || !height || weight <= 0 || height <= 0 || weight > 300 || height > 300) {
    errorDiv.style.display = 'block'; // Error dikhao
    return;
  }
  errorDiv.style.display = 'none'; // Error chupa do

  // Step 3: BMI formula = weight(kg) / height(m)^2
  // Height ko cm se m mein convert karo: height / 100
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const bmiRounded = bmi.toFixed(1); // 1 decimal point tak

  // Step 4: BMI number dikhao
  document.getElementById('bmiNumber').textContent = bmiRounded;

  // Step 5: Category aur advice decide karo
  const circle = document.getElementById('bmiCircle');
  const category = document.getElementById('bmiCategory');
  const advice = document.getElementById('bmiAdvice');

  if (bmi < 18.5) {
    // Underweight
    circle.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)';
    category.textContent = '🔵 Underweight';
    category.style.color = '#1976D2';
    advice.textContent = 'Your BMI is below normal range. You may need to increase calorie intake with nutritious foods. Consult a doctor or nutritionist for a proper diet plan.';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    // Normal
    circle.style.background = 'linear-gradient(135deg, #4a7c3f, #2e7d32)';
    category.textContent = '✅ Normal Weight';
    category.style.color = '#2e7d32';
    advice.textContent = 'Great! Your BMI is in the healthy range. Keep maintaining a balanced diet, regular exercise, and healthy lifestyle habits.';
  } else if (bmi >= 25 && bmi <= 29.9) {
    // Overweight
    circle.style.background = 'linear-gradient(135deg, #FFC107, #FF8F00)';
    category.textContent = '🟡 Overweight';
    category.style.color = '#FF8F00';
    advice.textContent = 'Your BMI is slightly above normal. Consider adding regular physical activity (30 mins daily) and reducing processed foods and sugar in your diet.';
  } else {
    // Obese
    circle.style.background = 'linear-gradient(135deg, #A82323, #c0392b)';
    category.textContent = '🔴 Obese';
    category.style.color = '#A82323';
    advice.textContent = 'Your BMI indicates obesity. This increases risk of diabetes, heart disease, and joint problems. Please consult a doctor for a proper weight management plan.';
  }
}

// ===== CONTACT FORM VALIDATION =====
function submitForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const topic = document.getElementById('topic').value;
  const message = document.getElementById('message').value.trim();

  document.getElementById('nameError').style.display = 'none';
  document.getElementById('emailError').style.display = 'none';
  document.getElementById('topicError').style.display = 'none';
  document.getElementById('messageError').style.display = 'none';

  let isValid = true;

  if (name === '') {
    document.getElementById('nameError').style.display = 'block';
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '' || !emailRegex.test(email)) {
    document.getElementById('emailError').style.display = 'block';
    isValid = false;
  }

  if (topic === '') {
    document.getElementById('topicError').style.display = 'block';
    isValid = false;
  }

  if (message === '') {
    document.getElementById('messageError').style.display = 'block';
    isValid = false;
  }

  if (isValid) {
    document.getElementById('successMsg').style.display = 'block';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('topic').value = '';
    document.getElementById('message').value = '';
    document.getElementById('successMsg').scrollIntoView({ behavior: 'smooth' });
  }
}

// ===== SYMPTOM ITEMS HIGHLIGHT =====
document.addEventListener('DOMContentLoaded', function () {
  const symptomItems = document.querySelectorAll('.symptom-item');
  symptomItems.forEach(item => {
    item.addEventListener('click', function () {
      const checkbox = this.querySelector('input');
      if (checkbox.checked) {
        this.classList.add('selected');
      } else {
        this.classList.remove('selected');
      }
    });
  });
});


// ===== HEALTH TIPS SLIDER =====
// Ye code tips cards ko left/right slide karta hai

let currentSlide = 0;      // Abhi konsa slide show ho raha hai
const visibleCards = 3;    // Ek waqt mein 3 cards dikhte hain

// Ye function page load hone pe slider setup karta hai
document.addEventListener('DOMContentLoaded', function () {
  setupSlider();
});

function setupSlider() {
  const track = document.getElementById('sliderTrack');
  if (!track) return; // Agar slider page pe nahi hai toh kuch mat karo

  const cards = track.querySelectorAll('.tip-card');
  const totalSlides = Math.ceil(cards.length / visibleCards); // Total pages = 8/3 = 3
  const dotsContainer = document.getElementById('sliderDots');

  // Step 1: Dots banao
  if (dotsContainer) {
    dotsContainer.innerHTML = ''; // Pehle khali karo
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active'); // Pehla dot active
      dot.onclick = function () { goToSlide(i); }; // Click pe us slide pe jao
      dotsContainer.appendChild(dot);
    }
  }
}

function moveSlider(direction) {
  const track = document.getElementById('sliderTrack');
  if (!track) return;

  const cards = track.querySelectorAll('.tip-card');
  const totalSlides = Math.ceil(cards.length / visibleCards);

  // Step 2: Current slide update karo
  currentSlide += direction;

  // Step 3: Boundaries check karo — pehle se peeche mat jao, akhri se aage mat jao
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;

  goToSlide(currentSlide);
}

function goToSlide(index) {
  const track = document.getElementById('sliderTrack');
  if (!track) return;

  currentSlide = index;

  // Step 4: Card ki width nikalo (280px card + 20px gap)
  const cardWidth = 280 + 20;

  // Step 5: Track ko slide karo — 3 cards ek waqt mein
  const offset = index * visibleCards * cardWidth;
  track.style.transform = 'translateX(-' + offset + 'px)';

  // Step 6: Active dot update karo
  const dots = document.querySelectorAll('.slider-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Auto slider — har 4 second mein apne aap slide ho
setInterval(function () {
  const track = document.getElementById('sliderTrack');
  if (track) moveSlider(1); // Automatically agle slide pe jao
}, 4000);

// ===== NEWSLETTER SIGNUP =====
// Ye function email validate karke success message dikhata hai
function subscribeNewsletter() {
  const email = document.getElementById('nlEmail').value.trim();
  const agree = document.getElementById('nlAgree').checked;
  const success = document.getElementById('nlSuccess');

  // Step 1: Email format check karo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    alert('Please enter a valid email address! 📧');
    return;
  }

  // Step 2: Checkbox check karo
  if (!agree) {
    alert('Please agree to receive newsletters! ✅');
    return;
  }

  // Step 3: Success message dikhao
  success.style.display = 'block';
  document.getElementById('nlEmail').value = '';
  document.getElementById('nlAgree').checked = false;
}
