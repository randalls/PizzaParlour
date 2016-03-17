var _ = require('lodash');

var RegisterPage = function () {
    var page = this;

    this.form = {
        firstName: element(by.name('firstName')),
        lastName: element(by.name('lastName')),
        emailAddress: element(by.name('emailAddress')),
        password: element(by.name('password')),
        confirm: element(by.name('confirm')),
        profession: element(by.name('profession')),
        companyName: element(by.name('companyName')),
        defaultMarketId: element(by.name('defaultMarketId')),
        billingAddressLine1: element(by.name('billingAddressLine1')),
        billingAddressLine2: element(by.name('billingAddressLine2')),
        billingAddressCity: element(by.name('billingAddressCity')),
        billingAddressState: element(by.name('billingAddressState')),
        billingAddressZip: element(by.name('billingAddressZip')),
        creditCardNumber: element(by.name('creditCardNumber')),
        cardExpirationMonth: element(by.name('cardExpirationMonth')),
        cardExpirationYear: element(by.name('cardExpirationYear'))
    };

    this.submitButton = element(by.name('submit'));

    this.get = function() {
        browser.get('/auth/register');
    };

    this.addValidFormData = function () {
        this.form.firstName.sendKeys('Ryan');
        this.form.lastName.sendKeys('Mathis');
        this.form.emailAddress.sendKeys('rshimkus@vizzda.com');
        this.form.password.sendKeys('password');
        this.form.confirm.sendKeys('password');
        this.form.profession.all(by.tagName('option')).get(1).click()
        this.form.companyName.sendKeys('Vizzda');
        //this.form.defaultMarketId.all(by.css('select option:nth-child(1)')).click();
        this.form.billingAddressLine1.sendKeys('123 Somewhere dr.');
        this.form.billingAddressCity.sendKeys('Tempe');
        this.form.billingAddressState.all(by.tagName('option')).get(1).click();
        this.form.billingAddressZip.sendKeys('85286');
        this.form.creditCardNumber.sendKeys('4111111111111111');
        this.form.cardExpirationMonth.all(by.tagName('option')).get(1).click();
        this.form.cardExpirationYear.all(by.tagName('option')).get(1).click();
    };
};


describe('Register page', function() {
    var page;

    beforeEach(function () {
        page = new RegisterPage();
        page.get();
    });

    it('should exist', function () {
        expect(browser.getLocationAbsUrl()).toBe('/auth/register');
    });

    xit('should only show validation once the user begins interracting with a field', function () {});
    xit('should warn on missing/malformed registration information', function () {});

    xit('should not allow the user to submit when the form is invalid', function () {
        expect(page.submitButton.isEnabled()).toBe(false);
    });

    xit('should allow the user to submit once the form is valid', function () {
        page.addValidFormData();
        expect(page.submitButton.isEnabled()).toBe(true);
    });

    xit('should notify the user when the server responds with an error', function () {
        expect(false).toBe(true);
    });

    xit('should notify the user when the server responds with success', function () {
        expect(false).toBe(true);
    });

    xit('should log the user in when the server responds with success', function () {
        expect(false).toBe(true);
    });
});
