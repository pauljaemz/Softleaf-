// Initialize EmailJS (replace with your public key)
(function() {
    emailjs.init("hBWhln6TAGQWZhU3N"); // Your EmailJS public key
})();

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("brochure-form");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = form.email.value;

        // Send email using EmailJS
        emailjs.send("service_y4wdacc", "template_r9zl5on", {
            to_email: email,
        })
        .then(function(response) {
            alert("Brochure sent! Please check your email.");
            form.reset();
        }, function(error) {
            alert("Failed to send brochure. Please try again later.");
        });
    });

    // Contact form handler
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const name = contactForm.name.value;
            const email = contactForm.email.value;
            const message = contactForm.message.value;

            emailjs.send("service_y4wdacc", "template_panrlz9", {
                from_name: name,
                from_email: email,
                message: message
            })
            .then(function(response) {
                alert("Message sent! We'll get back to you soon.");
                contactForm.reset();
            }, function(error) {
                alert("Failed to send message. Please try again later.");
            });
        });
    }
});