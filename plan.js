function subscribe(plan) {
    fetch('/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: plan }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'Subscription failed. Please try again.';
    });
}