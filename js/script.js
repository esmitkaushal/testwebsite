function trackEvent(eventName, eventData = {}) {
  console.log("Event triggered:", eventName, eventData);

  if (typeof AF === "function") {
    const afEvent = {
      eventType: "EVENT",
      eventName: eventName,
      eventValue: eventData
    };

    if (eventName === "purchase") {
      afEvent.eventRevenue = eventData.price;
      afEvent.eventRevenueCurrency = eventData.currency;
    }

    AF("pba", "event", afEvent);
  } else {
    console.warn("AppsFlyer SDK is not loaded yet.");
  }
}

function handleRegistration(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  trackEvent("complete_registration", {
    registration_method: "fake_form",
    name: name,
    email: email
  });

  const message = document.getElementById("registrationMessage");

  if (message) {
    message.innerText = "Registration completed successfully.";
  }
}

function handlePurchase() {
  window.location.href = "thank-you.html";
}

function trackPageView() {
  trackEvent("website_visit", {
    page_title: document.title,
    page_path: window.location.pathname
  });
}

function updateThankYouPage() {
  const title = document.getElementById("thankYouTitle");
  const message = document.getElementById("thankYouMessage");

  if (!title || !message) {
    return;
  }

  title.innerText = "Purchase completed!";
  message.innerText = "This success page was reached after a fake purchase.";

  trackEvent("purchase", {
    product_name: "Test Subscription",
    price: 9.99,
    currency: "USD"
  });
}

trackPageView();
updateThankYouPage();