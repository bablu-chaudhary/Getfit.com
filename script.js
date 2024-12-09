function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const bmiResult = document.getElementById('bmi-result');

    if (weight > 0 && height > 0) {
        const bmi = (weight / (height * height)).toFixed(2);
        bmiResult.innerText = `Your BMI is ${bmi}`;
    } else {
        bmiResult.innerText = 'Please enter valid weight and height.';
    }
}

function calculateBodyFat() {
    const waist = parseFloat(document.getElementById('waist').value);
    const neck = parseFloat(document.getElementById('neck').value);
    const height = parseFloat(document.getElementById('height-body').value);
    const bodyFatResult = document.getElementById('body-fat-result');

    if (waist > 0 && neck > 0 && height > 0) {
        const bodyFat = (waist - neck) * 0.74 - (height * 0.082) + 34.89; // Simplified formula
        bodyFatResult.innerText = `Estimated Body Fat: ${bodyFat.toFixed(2)}%`;
    } else {
        bodyFatResult.innerText = 'Please enter valid measurements.';
    }
}
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}
function calculateCalories() {
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight-calories').value);
    const height = parseFloat(document.getElementById('height-calories').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const activityLevel = parseFloat(document.getElementById('activity-level').value);
    const caloriesResult = document.getElementById('calories-result');

    // Validate inputs
    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
        caloriesResult.innerText = 'Please enter valid numbers for age, weight, and height.';
        return;
    }

    let BMR;
    if (gender === 'male') {
        BMR = 10 * weight + 6.25 * (height * 100) - 5 * age + 5; // Convert height to cm
    } else {
        BMR = 10 * weight + 6.25 * (height * 100) - 5 * age - 161; // Convert height to cm
    }

    const TDEE = BMR * activityLevel;

    caloriesResult.innerText = `Your Total Daily Caloric Needs: ${Math.round(TDEE)} calories`;
}