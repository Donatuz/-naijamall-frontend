// Registration Forms for Different User Types

// Show Seller Registration Form
window.showSellerForm = function() {
    const formHTML = `
        <div class="modal-overlay" id="sellerFormModal" onclick="closeModalOnOverlay(event, 'sellerFormModal')">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2>🏪 Become a Seller</h2>
                    <button class="btn-close" onclick="closeModal('sellerFormModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="form-intro">Join NaijaMall as a seller and reach thousands of buyers across Lagos!</p>
                    <form id="sellerRegistrationForm" onsubmit="submitSellerForm(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="sellerName">Full Name / Business Name *</label>
                                <input type="text" id="sellerName" required placeholder="Enter your name or business name">
                            </div>
                            <div class="form-group">
                                <label for="sellerEmail">Email Address *</label>
                                <input type="email" id="sellerEmail" required placeholder="your@email.com">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="sellerPhone">Phone Number *</label>
                                <input type="tel" id="sellerPhone" required placeholder="+234 XXX XXX XXXX">
                            </div>
                            <div class="form-group">
                                <label for="sellerMarket">Market Location *</label>
                                <select id="sellerMarket" required>
                                    <option value="">Select your market</option>
                                    <option value="mile12">Mile 12 Market</option>
                                    <option value="oyingbo">Oyingbo Market</option>
                                    <option value="idumota">Idumota Market</option>
                                    <option value="balogun">Balogun Market</option>
                                    <option value="oshodi">Oshodi Market</option>
                                    <option value="daleko">Daleko Market</option>
                                    <option value="ikotun">Ikotun Market</option>
                                    <option value="tejuosho">Tejuosho Market</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="sellerProducts">What products do you sell? *</label>
                            <textarea id="sellerProducts" rows="3" required placeholder="e.g., Fresh vegetables, grains, fruits, etc."></textarea>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="sellerExperience">Years of Experience *</label>
                                <select id="sellerExperience" required>
                                    <option value="">Select</option>
                                    <option value="less-than-1">Less than 1 year</option>
                                    <option value="1-3">1-3 years</option>
                                    <option value="3-5">3-5 years</option>
                                    <option value="5-plus">5+ years</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="sellerVolume">Average Monthly Sales Volume</label>
                                <select id="sellerVolume">
                                    <option value="">Select</option>
                                    <option value="low">Under ₦100,000</option>
                                    <option value="medium">₦100,000 - ₦500,000</option>
                                    <option value="high">₦500,000 - ₦1,000,000</option>
                                    <option value="very-high">Over ₦1,000,000</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="sellerAddress">Shop/Stall Address *</label>
                            <input type="text" id="sellerAddress" required placeholder="Shop number and location">
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn-secondary" onclick="closeModal('sellerFormModal')">Cancel</button>
                            <button type="submit" class="btn-primary">Submit Application</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHTML);
};

// Show Rider Registration Form
window.showRiderForm = function() {
    const formHTML = `
        <div class="modal-overlay" id="riderFormModal" onclick="closeModalOnOverlay(event, 'riderFormModal')">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2>🏍️ Join as Rider</h2>
                    <button class="btn-close" onclick="closeModal('riderFormModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="form-intro">Become a delivery rider and earn money delivering fresh products across Lagos!</p>
                    <form id="riderRegistrationForm" onsubmit="submitRiderForm(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="riderName">Full Name *</label>
                                <input type="text" id="riderName" required placeholder="Enter your full name">
                            </div>
                            <div class="form-group">
                                <label for="riderEmail">Email Address *</label>
                                <input type="email" id="riderEmail" required placeholder="your@email.com">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="riderPhone">Phone Number *</label>
                                <input type="tel" id="riderPhone" required placeholder="+234 XXX XXX XXXX">
                            </div>
                            <div class="form-group">
                                <label for="riderLocation">Primary Location *</label>
                                <select id="riderLocation" required>
                                    <option value="">Select your area</option>
                                    <option value="ikeja">Ikeja</option>
                                    <option value="yaba">Yaba</option>
                                    <option value="surulere">Surulere</option>
                                    <option value="lekki">Lekki</option>
                                    <option value="vi">Victoria Island</option>
                                    <option value="ikoyi">Ikoyi</option>
                                    <option value="festac">Festac</option>
                                    <option value="ikorodu">Ikorodu</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="riderVehicle">Vehicle Type *</label>
                                <select id="riderVehicle" required>
                                    <option value="">Select</option>
                                    <option value="motorcycle">Motorcycle</option>
                                    <option value="bicycle">Bicycle</option>
                                    <option value="car">Car</option>
                                    <option value="van">Van</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="riderLicense">Driver's License Number *</label>
                                <input type="text" id="riderLicense" required placeholder="Enter license number">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="riderExperience">Delivery Experience</label>
                            <select id="riderExperience">
                                <option value="">Select</option>
                                <option value="none">No experience</option>
                                <option value="less-than-1">Less than 1 year</option>
                                <option value="1-2">1-2 years</option>
                                <option value="2-plus">2+ years</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="riderAvailability">Availability *</label>
                            <div class="checkbox-group">
                                <label><input type="checkbox" name="availability" value="weekdays"> Weekdays</label>
                                <label><input type="checkbox" name="availability" value="weekends"> Weekends</label>
                                <label><input type="checkbox" name="availability" value="fulltime"> Full-time</label>
                                <label><input type="checkbox" name="availability" value="parttime"> Part-time</label>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn-secondary" onclick="closeModal('riderFormModal')">Cancel</button>
                            <button type="submit" class="btn-primary">Submit Application</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHTML);
};

// Show Partner Registration Form
window.showPartnerForm = function() {
    const formHTML = `
        <div class="modal-overlay" id="partnerFormModal" onclick="closeModalOnOverlay(event, 'partnerFormModal')">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2>🤝 Partner With Us</h2>
                    <button class="btn-close" onclick="closeModal('partnerFormModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="form-intro">Let's grow together! Partner with NaijaMall to expand your business reach.</p>
                    <form id="partnerRegistrationForm" onsubmit="submitPartnerForm(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="partnerCompany">Company/Organization Name *</label>
                                <input type="text" id="partnerCompany" required placeholder="Enter company name">
                            </div>
                            <div class="form-group">
                                <label for="partnerContact">Contact Person Name *</label>
                                <input type="text" id="partnerContact" required placeholder="Full name">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="partnerEmail">Business Email *</label>
                                <input type="email" id="partnerEmail" required placeholder="company@email.com">
                            </div>
                            <div class="form-group">
                                <label for="partnerPhone">Phone Number *</label>
                                <input type="tel" id="partnerPhone" required placeholder="+234 XXX XXX XXXX">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="partnerType">Partnership Type *</label>
                            <select id="partnerType" required>
                                <option value="">Select partnership type</option>
                                <option value="supplier">Product Supplier</option>
                                <option value="logistics">Logistics Partner</option>
                                <option value="technology">Technology Partner</option>
                                <option value="financial">Financial Services</option>
                                <option value="marketing">Marketing/Advertising</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="partnerDescription">Tell us about your business *</label>
                            <textarea id="partnerDescription" rows="4" required placeholder="Describe your business and what you offer..."></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="partnerProposal">Partnership Proposal *</label>
                            <textarea id="partnerProposal" rows="4" required placeholder="How would you like to partner with NaijaMall? What value can you bring?"></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="partnerWebsite">Website (Optional)</label>
                            <input type="url" id="partnerWebsite" placeholder="https://yourwebsite.com">
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn-secondary" onclick="closeModal('partnerFormModal')">Cancel</button>
                            <button type="submit" class="btn-primary">Submit Proposal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHTML);
};

// Show Wholesale Registration Form
window.showWholesaleForm = function() {
    const formHTML = `
        <div class="modal-overlay" id="wholesaleFormModal" onclick="closeModalOnOverlay(event, 'wholesaleFormModal')">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2>📦 Wholesale Inquiry</h2>
                    <button class="btn-close" onclick="closeModal('wholesaleFormModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="form-intro">Interested in bulk purchases? Get special wholesale rates for large orders!</p>
                    <form id="wholesaleRegistrationForm" onsubmit="submitWholesaleForm(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="wholesaleName">Full Name / Business Name *</label>
                                <input type="text" id="wholesaleName" required placeholder="Enter your name or business name">
                            </div>
                            <div class="form-group">
                                <label for="wholesaleEmail">Email Address *</label>
                                <input type="email" id="wholesaleEmail" required placeholder="your@email.com">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="wholesalePhone">Phone Number *</label>
                                <input type="tel" id="wholesalePhone" required placeholder="+234 XXX XXX XXXX">
                            </div>
                            <div class="form-group">
                                <label for="wholesaleType">Business Type *</label>
                                <select id="wholesaleType" required>
                                    <option value="">Select</option>
                                    <option value="restaurant">Restaurant/Hotel</option>
                                    <option value="retailer">Retailer</option>
                                    <option value="events">Events/Catering</option>
                                    <option value="institution">Institution (School/Hospital)</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="wholesaleProducts">Products Interested In *</label>
                            <textarea id="wholesaleProducts" rows="3" required placeholder="List the products you need (e.g., vegetables, grains, fruits, etc.)"></textarea>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="wholesaleQuantity">Estimated Order Quantity *</label>
                                <select id="wholesaleQuantity" required>
                                    <option value="">Select</option>
                                    <option value="small">₦50,000 - ₦100,000</option>
                                    <option value="medium">₦100,000 - ₦500,000</option>
                                    <option value="large">₦500,000 - ₦1,000,000</option>
                                    <option value="very-large">Over ₦1,000,000</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="wholesaleFrequency">Order Frequency *</label>
                                <select id="wholesaleFrequency" required>
                                    <option value="">Select</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="biweekly">Bi-weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="as-needed">As Needed</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="wholesaleLocation">Delivery Location *</label>
                            <input type="text" id="wholesaleLocation" required placeholder="Full delivery address">
                        </div>
                        
                        <div class="form-group">
                            <label for="wholesaleNotes">Additional Requirements</label>
                            <textarea id="wholesaleNotes" rows="3" placeholder="Any specific requirements or preferences?"></textarea>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn-secondary" onclick="closeModal('wholesaleFormModal')">Cancel</button>
                            <button type="submit" class="btn-primary">Submit Inquiry</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHTML);
};

// Form Submission Handlers
window.submitSellerForm = function(e) {
    e.preventDefault();
    const formData = {
        type: 'seller',
        name: document.getElementById('sellerName').value,
        email: document.getElementById('sellerEmail').value,
        phone: document.getElementById('sellerPhone').value,
        market: document.getElementById('sellerMarket').value,
        products: document.getElementById('sellerProducts').value,
        experience: document.getElementById('sellerExperience').value,
        volume: document.getElementById('sellerVolume').value,
        address: document.getElementById('sellerAddress').value,
        submittedAt: new Date().toISOString()
    };
    
    console.log('Seller application:', formData);
    localStorage.setItem('sellerApplication_' + Date.now(), JSON.stringify(formData));
    alert('Thank you for applying! Our team will review your application and contact you within 24-48 hours.');
    closeModal('sellerFormModal');
};

window.submitRiderForm = function(e) {
    e.preventDefault();
    const availability = Array.from(document.querySelectorAll('input[name="availability"]:checked'))
        .map(cb => cb.value);
    
    const formData = {
        type: 'rider',
        name: document.getElementById('riderName').value,
        email: document.getElementById('riderEmail').value,
        phone: document.getElementById('riderPhone').value,
        location: document.getElementById('riderLocation').value,
        vehicle: document.getElementById('riderVehicle').value,
        license: document.getElementById('riderLicense').value,
        experience: document.getElementById('riderExperience').value,
        availability: availability,
        submittedAt: new Date().toISOString()
    };
    
    console.log('Rider application:', formData);
    localStorage.setItem('riderApplication_' + Date.now(), JSON.stringify(formData));
    alert('Thank you for applying! Our team will review your application and contact you within 24-48 hours.');
    closeModal('riderFormModal');
};

window.submitPartnerForm = function(e) {
    e.preventDefault();
    const formData = {
        type: 'partner',
        company: document.getElementById('partnerCompany').value,
        contactPerson: document.getElementById('partnerContact').value,
        email: document.getElementById('partnerEmail').value,
        phone: document.getElementById('partnerPhone').value,
        partnershipType: document.getElementById('partnerType').value,
        description: document.getElementById('partnerDescription').value,
        proposal: document.getElementById('partnerProposal').value,
        website: document.getElementById('partnerWebsite').value,
        submittedAt: new Date().toISOString()
    };
    
    console.log('Partnership proposal:', formData);
    localStorage.setItem('partnerApplication_' + Date.now(), JSON.stringify(formData));
    alert('Thank you for your interest! Our partnerships team will review your proposal and get back to you soon.');
    closeModal('partnerFormModal');
};

window.submitWholesaleForm = function(e) {
    e.preventDefault();
    const formData = {
        type: 'wholesale',
        name: document.getElementById('wholesaleName').value,
        email: document.getElementById('wholesaleEmail').value,
        phone: document.getElementById('wholesalePhone').value,
        businessType: document.getElementById('wholesaleType').value,
        products: document.getElementById('wholesaleProducts').value,
        quantity: document.getElementById('wholesaleQuantity').value,
        frequency: document.getElementById('wholesaleFrequency').value,
        location: document.getElementById('wholesaleLocation').value,
        notes: document.getElementById('wholesaleNotes').value,
        submittedAt: new Date().toISOString()
    };
    
    console.log('Wholesale inquiry:', formData);
    localStorage.setItem('wholesaleInquiry_' + Date.now(), JSON.stringify(formData));
    alert('Thank you for your inquiry! Our wholesale team will contact you with pricing and availability within 24 hours.');
    closeModal('wholesaleFormModal');
};

console.log('Registration forms loaded successfully!');
