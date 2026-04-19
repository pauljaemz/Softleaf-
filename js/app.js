// --- 1. CONFIGURATION ---
        (function() {
            // REPLACE WITH YOUR PUBLIC KEY
            emailjs.init("-WJ90BZg2Us5oMo4c"); 
        })();

        // --- 2. DATA (Cleaned up from HTML) ---
        const productsData = {
            "handwash": {
                title: "Softleaf Handwash",
                desc: "Gentle yet effective, infused with our signature fragrance.",
                image: "Products/Handwash.png",
                hasOptions: true,
                variants: {
                    "Standard": {
                        "250 ml": { price: 150, url: "#", img: "Products/Handwash.png" }
                    },
                    "Green Apple": {
                        "250 ml": { price: 150, url: "#", img: "Products/Handwash greenapple.png" }
                    },
                    "Lavender": {
                        "250 ml": { price: 150, url: "#", img: "Products/Handwash lavender.png" }
                    },
                    "Rose": {
                        "250 ml": { price: 150, url: "#", img: "Products/Handwash rose.png" }
                    }
                }
            },
            "dishwash": {
                title: "Dishwash Gel",
                desc: "Kills 99.9% of germs, Tough on grease, kind to hands.",
                image: "Products/Dishwash 500ml.png",
                hasOptions: false,
                variants: {
                    "Standard": {
                        "500 ml": { price: 120, url: "#", img: "Products/Dishwash 500ml.png" },
                        "1 ltr": { price: 220, url: "#", img: "Products/Dishwash 1L.png" }
                    }
                }
            },
            "floor": {
                title: "Floor Cleaner Collection",
                desc: "A range of floor cleaners with unique fragrances.",
                image: "Products/FL lavender 1L.png",
                hasOptions: true,
                variants: {
                    "Lavender": { "500 ml": { price: 100, url: "#", img: "Products/FL lavender.png"}, "1 ltr": { price: 180, url: "#", img: "Products/FL lavender 1L.png"} },
                    "Orange": { "500 ml": { price: 100, url: "#", img: "Products/FL orange.png"}, "1 ltr": { price: 180, url: "#", img: "Products/FL orange 1L.png"} },
                    "Rose": { "1 ltr": { price: 180, url: "#", img: "Products/FL rose 1L.png"} },
                    "Sandal": { "1 ltr": { price: 180, url: "#", img: "Products/FL sandal 1L.png"} }
                }
            },
            "glass": {
                title: "Clear Glass Cleaner",
                desc: "Streak-free shine for a crystal-clear finish.",
                image: "Products/Glasscleaner 500ml.png",
                hasOptions: false,
                variants: {
                    "Standard": {
                        "500 ml": { price: 90, url: "#", img: "Products/Glasscleaner 500ml.png" }
                    }
                }
            },
            "detergent": {
                title: "Liquid Detergent",
                desc: "Powerful stain removal with a gentle touch.",
                image: "Products/Detergent1L.png",
                hasOptions: false,
                variants: {
                    "Standard": {
                        "300 ml": { price: 100, url: "#", img: "Products/Detergent 300ml.png" },
                        "1 ltr": { price: 300, url: "#", img: "Products/Detergent1L.png" }
                    }
                }
            },
            "toilet": {
                title: "Deep Toilet Cleaner",
                desc: "Deep clean with a refreshing aroma.",
                image: "Products/Toiletcleaner 600ml.png",
                hasOptions: false,
                variants: {
                    "Standard": {
                        "600 ml": { price: 110, url: "#", img: "Products/Toiletcleaner 600ml.png" },
                        "1 ltr": { price: 180, url: "#", img: "Products/Toiletcleaner 1L.png" }
                    }
                }
            },
            "power_toilet": {
                title: "Power Toilet Cleaner",
                desc: "Advanced stain removal for ultimate hygiene.",
                image: "Products/Tolietcleanerblack 500ml.png",
                hasOptions: false,
                variants: {
                    "Standard": {
                        "500 ml": { price: 130, url: "#", img: "Products/Tolietcleanerblack 500ml.png" }
                    }
                }
            },
            "cleaner": {
                title: "All-Purpose Cleaner",
                desc: "Your solution for safe, clean surfaces everywhere.",
                image: "Products/Cleaner 1L.png",
                hasOptions: false,
                variants: {
                    "Standard": {
                        "1 ltr": { price: 150, url: "#", img: "Products/Cleaner 1L.png" }
                    }
                }
            }
        };

        // --- 3. UI LOGIC ---
        
        // Navigation Toggle
        function toggleMenu() {
            document.getElementById('navLinks').classList.toggle('active');
        }

        // Toast Notification
        function showToast(message) {
            const toast = document.getElementById("toast");
            toast.innerText = message;
            toast.className = "show";
            setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
        }

        // --- 4. MODAL LOGIC ---
        let currentProduct = null;
        let selectedFragrance = null;
        let selectedSize = null;

        function openProduct(id) {
            const data = productsData[id];
            if(!data) return;

            currentProduct = data;
            document.getElementById('modalTitle').innerText = data.title;
            document.getElementById('modalDescription').innerText = data.desc;
            document.getElementById('modalImage').src = data.image;

            const fragSelect = document.getElementById('fragranceSelect');
            const fragContainer = document.getElementById('fragranceContainer');
            
            // Setup Fragrance Dropdown
            fragSelect.innerHTML = '';
            const fragKeys = Object.keys(data.variants);
            
            if(data.hasOptions && fragKeys.length > 1) {
                fragContainer.style.display = 'block';
                fragKeys.forEach(frag => {
                    const opt = document.createElement('option');
                    opt.value = frag;
                    opt.innerText = frag;
                    fragSelect.appendChild(opt);
                });
                selectedFragrance = fragKeys[0];
            } else {
                fragContainer.style.display = 'none';
                selectedFragrance = "Standard"; 
                // Handle case where product has options but technically listed as "Standard" in data
                if(fragKeys.length > 0) selectedFragrance = fragKeys[0];
            }

            fragSelect.onchange = (e) => {
                selectedFragrance = e.target.value;
                updateSizeOptions();
            };

            updateSizeOptions(); // Initialize sizes based on first fragrance
            document.getElementById('productModal').style.display = 'flex';
        }

        function updateSizeOptions() {
            const sizeSelect = document.getElementById('sizeSelect');
            sizeSelect.innerHTML = '';
            
            const variantData = currentProduct.variants[selectedFragrance];
            const sizes = Object.keys(variantData);

            sizes.forEach(size => {
                const opt = document.createElement('option');
                opt.value = size;
                opt.innerText = size;
                sizeSelect.appendChild(opt);
            });

            selectedSize = sizes[0];
            sizeSelect.onchange = (e) => {
                selectedSize = e.target.value;
                updateDetails();
            };

            updateDetails();
        }

        function updateDetails() {
            const details = currentProduct.variants[selectedFragrance][selectedSize];
            
            // Update Price
            document.getElementById('modalPrice').innerText = `₹${details.price}`;
            
            // Update Link removed for Add to Inquiry

            // Update Image (if variant has specific image)
            if(details.img) {
                document.getElementById('modalImage').src = details.img;
            }

            // Update Stamps
            const stampContainer = document.getElementById('stampSelector');
            stampContainer.innerHTML = '';
            const variantData = currentProduct.variants[selectedFragrance];
            Object.keys(variantData).forEach(sz => {
                if(variantData[sz].img) {
                    const img = document.createElement('img');
                    img.src = variantData[sz].img;
                    img.className = `stamp-image ${sz === selectedSize ? 'active' : ''}`;
                    img.onclick = () => {
                        document.getElementById('sizeSelect').value = sz;
                        selectedSize = sz;
                        updateDetails();
                    };
                    stampContainer.appendChild(img);
                }
            });
        }

        function closeProductModal() {
            document.getElementById('productModal').style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target === document.getElementById('productModal')) {
                closeProductModal();
            }
        };

        function addToInquiry(e) {
            e.preventDefault();
            const container = document.getElementById('product-fields');
            let rows = container.querySelectorAll('.product-row');
            
            let added = false;
            rows.forEach(row => {
                const select = row.querySelector('select[name="product[]"]');
                const fragSel = row.querySelector('.frag-select');
                const sizeSel = row.querySelector('.size-select');
                
                let matchesTitle = select && select.value === currentProduct.title;
                let matchesFrag = !fragSel || (selectedFragrance && fragSel.value === selectedFragrance);
                let matchesSize = !sizeSel || (selectedSize && sizeSel.value === selectedSize);

                if (matchesTitle && matchesFrag && matchesSize) {
                    updateCounter(row.querySelector('button'), 1);
                    added = true;
                }
            });

            if (!added) {
                let emptyRow = Array.from(rows).find(row => !row.querySelector('select[name="product[]"]').value);
                let targetRow = emptyRow;
                
                if(!targetRow) {
                    if(rows.length < 5) {
                        addProductField();
                        const newRows = container.querySelectorAll('.product-row');
                        targetRow = newRows[newRows.length - 1];
                    } else {
                        showToast("List is full. Submit text in message.");
                        return;
                    }
                }
                
                const productSel = targetRow.querySelector('select[name="product[]"]');
                productSel.value = currentProduct.title;
                checkSelections(productSel); 
                
                if (selectedFragrance) {
                    const fragSel = targetRow.querySelector('.frag-select');
                    if(fragSel) fragSel.value = selectedFragrance;
                }
                if (selectedSize) {
                    const sizeSel = targetRow.querySelector('.size-select');
                    if(sizeSel) {
                        // Ensure options are updated before setting value
                        const evt = new Event('change');
                        const fragSel = targetRow.querySelector('.frag-select');
                        if (fragSel) fragSel.dispatchEvent(evt);
                        sizeSel.value = selectedSize;
                    }
                }
            }
            
            closeProductModal();
            document.getElementById('connect').scrollIntoView({ behavior: 'smooth' });
            showToast("Item added! Submit the form below to secure your order.");
        }

        // --- 5. FORM LOGIC ---
        function removeProductField(btn) {
            const row = btn.closest('.product-row');
            const container = document.getElementById('product-fields');
            row.remove();
            if(container.querySelectorAll('.product-row').length === 0) {
                addProductField();
            }
        }

        function checkSelections(selectEl) {
            const title = selectEl.value;
            const row = selectEl.closest('.product-row');
            const variantContainer = row.querySelector('.variant-options');
            variantContainer.innerHTML = ''; 

            let productKey = Object.keys(productsData).find(k => productsData[k].title === title);
            if(!productKey) return;

            const product = productsData[productKey];
            const variants = product.variants;
            const fragKeys = Object.keys(variants);
            
            // Fragrance Select
            if(product.hasOptions && fragKeys.length > 1) {
                const fragSelect = document.createElement('select');
                fragSelect.className = 'frag-select';
                fragSelect.style.marginBottom = "0";
                fragKeys.forEach(frag => {
                    const opt = document.createElement('option');
                    opt.value = frag;
                    opt.innerText = frag;
                    fragSelect.appendChild(opt);
                });
                fragSelect.onchange = () => updateSizeForForm(product, fragSelect, row);
                variantContainer.appendChild(fragSelect);
            }

            // Size Select
            const sizeSelect = document.createElement('select');
            sizeSelect.className = 'size-select';
            sizeSelect.style.marginBottom = "0";
            variantContainer.appendChild(sizeSelect);
            
            const initialFrag = (product.hasOptions && fragKeys.length > 1) ? fragKeys[0] : fragKeys[0];
            updateSizeForForm(product, {value: initialFrag}, row);
        }

        function updateSizeForForm(product, fragSelectEl, row) {
            const sizeSelect = row.querySelector('.size-select');
            sizeSelect.innerHTML = '';
            const fragVal = fragSelectEl.value || Object.keys(product.variants)[0];
            const sizeKeys = Object.keys(product.variants[fragVal] || {});
            
            sizeKeys.forEach(sz => {
                const opt = document.createElement('option');
                opt.value = sz;
                opt.innerText = sz;
                sizeSelect.appendChild(opt);
            });
        }

        function addProductField() {
            const container = document.getElementById('product-fields');
            const count = container.querySelectorAll('.product-row').length;
            if(count >= 5) { showToast("Maximum 5 products allowed."); return; }

            const div = document.createElement('div');
            div.className = 'product-row';
            div.innerHTML = `
                <select name="product[]" onchange="checkSelections(this)">
                    <option value="" disabled selected>Select Product</option>
                    ${Object.values(productsData).map(p => `<option value="${p.title}">${p.title}</option>`).join('')}
                </select>
                <div class="variant-options"></div>
                <div class="product-counter">
                    <button type="button" onclick="updateCounter(this, -1)">-</button>
                    <input type="number" name="numberNeeded[]" value="1" min="1" readonly>
                    <button type="button" onclick="updateCounter(this, 1)">+</button>
                    <button type="button" onclick="removeProductField(this)" style="background:none; color:red; font-size:18px; margin-left:5px;">&times;</button>
                </div>
            `;
            container.appendChild(div);
        }

        function updateCounter(btn, val) {
            const input = btn.parentElement.querySelector('input');
            let newVal = parseInt(input.value) + val;
            if(newVal < 1) newVal = 1;
            input.value = newVal;
        }

        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            btn.innerText = "Sending...";
            
            // Gather product details text
            let productText = "";
            this.querySelectorAll('.product-row').forEach(row => {
                const sel = row.querySelector('select[name="product[]"]');
                const pName = sel ? sel.value : "";
                
                let variantText = "";
                const fragSel = row.querySelector('.frag-select');
                if (fragSel && fragSel.value) variantText += ` [${fragSel.value}]`;
                
                const sizeSel = row.querySelector('.size-select');
                if (sizeSel && sizeSel.value) variantText += ` (${sizeSel.value})`;

                const qty = row.querySelector('input');
                if(pName) productText += `${pName}${variantText} (Qty: ${qty.value})\n`;
            });

            const templateParams = {
                from_name: this.name.value,
                from_email: this.email.value,
                phone: this.phone.value,
                message: this.message.value + "\n\nProducts:\n" + productText
            };

            emailjs.send("service_nvtpn9o", "template_e3sonzq", templateParams)
            .then(() => {
                showToast("Message Sent Successfully!");
                this.reset();
                btn.innerText = "Send Message";
            }, (err) => {
                showToast("Failed to send. Try again.");
                btn.innerText = "Send Message";
                console.error(err);
            });
        });

        document.getElementById('brochure-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button');
            btn.innerText = "...";
            
            emailjs.send("service_nvtpn9o", "template_ty9do8j", { to_email: this.email.value })
            .then(() => {
                showToast("Brochure request sent!");
                this.reset();
                btn.innerText = "Request Brochure";
            }, () => {
                showToast("Error sending request.");
                btn.innerText = "Request Brochure";
            });
        });

document.addEventListener("DOMContentLoaded", function() {
            const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        });

