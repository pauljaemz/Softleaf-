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
            const phone = contactForm.phone.value;
            const message = contactForm.message.value;

            // Collect product info
            const productRows = contactForm.querySelectorAll('.product-row');
            let products_info = "";
            productRows.forEach((row, idx) => {
                const product = row.querySelector('select[name="product[]"]').value;
                const quantity = row.querySelector('select[name="quantity[]"]').value;
                const numberNeeded = row.querySelector('input[name="numberNeeded[]"]').value;
                if (product && quantity) {
                    products_info += `Product ${idx + 1}: ${product} - ${quantity} x ${numberNeeded}\n`;
                }
            });

            // Require at least email or phone
            if (!email && !phone) {
                alert("Please provide either an email address or a phone number.");
                return;
            }

            emailjs.send("service_y4wdacc", "template_panrlz9", {
                from_name: name,
                from_email: email,
                phone: phone,
                message: message,
                products_info: products_info
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