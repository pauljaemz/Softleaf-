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
            brochure_link: window.location.origin + "/brochure.pdf"
        })
        .then(function(response) {
            alert("Brochure sent! Please check your email.");
            form.reset();
        }, function(error) {
            alert("Failed to send brochure. Please try again later.");
        });
    });
});