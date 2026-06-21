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

  window.location.href = "thank-you.html?source=registration";
}

function handlePurchase() {
  window.location.href = "thank-you.html?source=purchase";
}

function trackPageView() {
  trackEvent("website_visit", {
    page_title: document.title,
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

    trackEvent("complete_registration", {
      registration_method: "fake_form"
    });
  } else if (source === "purchase") {
    title.innerText = "Purchase completed!";
    message.innerText = "This success page was reached after a fake purchase.";

    trackEvent("purchase", {
      product_name: "Test Subscription",
      price: 9.99,
      currency: "USD"
    });
  }
}

trackPageView();
updateThankYouPage();