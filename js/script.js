function trackEvent(eventName, eventData = {}) {
  console.log("Event triggered:", eventName, eventData);

  if (typeof AF === "function") {
    AF("pba", "event", {
      eventType: "EVENT",
      eventName: eventName,
      eventValue: eventData
    });
  } else {
    console.warn("AppsFlyer SDK is not loaded yet.");
  }
}

function handleRegistration(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  trackEvent("registration_completed", {
    name: name,
    email: email
  });

  window.location.href = "thank-you.html?source=registration";
}

function handlePurchase() {
  trackEvent("purchase_completed", {
    product_name: "Test Subscription",
    price: 9.99,
    currency: "USD"
  });

  window.location.href = "thank-you.html?source=purchase";
}

function trackPageView() {
  const pageName = document.title;

  trackEvent("page_view", {
    page_title: pageName,
    page_path: window.location.pathname
  });
}

function updateThankYouPage() {
  const params = new URLSearchParams(window.location.search);
  const source = params.get("source");

  const title = document.getElementById("thankYouTitle");
  const message = document.getElementById("thankYouMessage");

  if (!title || !message) {
    return;
  }

  if (source === "registration") {
    title.innerText = "Registration completed!";
    message.innerText = "This success page was reached after a fake registration.";
  } else if (source === "purchase") {
    title.innerText = "Purchase completed!";
    message.innerText = "This success page was reached after a fake purchase.";
  }
}

trackPageView();
updateThankYouPage();