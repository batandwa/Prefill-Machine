(function(win, doc, $) {

  'use strict';

  // Don't run script if jQuery isn't loaded
  if (typeof win.jQuery === 'undefined') {
    return;
  }

  var data, fillForm, FormData, len, _rand;

  // I like Chris's randomize function.  Lets use it here.
  _rand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
    
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

  // Load FakerJS library
  $.getScript('//cdnjs.cloudflare.com/ajax/libs/Faker/0.7.2/MinFaker.js', function() {
      fillForm();
    }, function() {
      win.console.error('ERROR: FakerJS not loaded!');
    });




  /*==========  CREATE DATA OBJECT  ==========*/

  FormData = function(faker) {

    this.faker     = faker;

    this.title     = toTitleCase(faker.Lorem.words(_rand(3,6)).join(' '));
    this.name      = faker.Name.firstName();
    this.surname   = faker.Name.lastName();
    this.fullName   = this.name + ' ' + this.surname;

    this.randomWord = faker.Internet.domainWord();

    this.username  = 'fake_' + this.name;
    this.username  += _rand(100,9999);
    this.email     = faker.Internet.email();
    this.phoneNumber = faker.PhoneNumber.phoneNumber();

    // set this value to your password specifications
    this.password  = this.username;

    this.address1  = faker.Address.streetAddress();
    this.address2  = faker.Address.secondaryAddress();
    this.city      = faker.Address.city();
    this.state     = faker.random.br_state_abbr();
    this.zip       = faker.Address.zipCode();

    // Chris's actual credit card number
    this.cc        = '4242 4242 4242 4242';
    this.exp1      = _rand(1,12);
    this.exp2      = _rand(14,22);
    this.cvv       = _rand(100,999);
      
    this.company   = faker.Company.companyName();

  };


  FormData.prototype.randomizeSelect = function(el) {
    var $el = $(el);

    len  = $el.find('option').length - 1;

    $el.children('option')
      .attr('selected', false)
      .eq( _rand( 1,len + 1 ) )
      .attr('selected', true);
  };

  FormData.prototype.randomizeRadio = function(radios) {
    radios = radios.not('[type="hidden"]');
    len    = radios.length;

    radios
      .attr('checked', false)
      .eq( _rand( 0, len - 1 ) )
      .attr('checked', true);
  };

  FormData.prototype.randomizeParagraph = function(el) {
    $(el).val(this.faker.Lorem.sentence(10, true, 20));
  };

  FormData.prototype.randomizeCheckbox = function(el) {
    var $el  = $(el);

    $el.attr('checked', false);

    if (_rand( 0,1 ) === 0) {
      $el.attr('checked', true);
    }
  };

  FormData.prototype.randomizeEmail = function(el) {
    $(el).val('chriscoyier+' + this.randomWord + '@gmail.com');
  };

  FormData.prototype.randomizeNumber = function(el, min, max) {
    $(el).val(_rand(min, max));
  };

  FormData.prototype.randomizePhrase = function(el, min, max) {
    $(el).val(this.faker.Lorem.words(_rand(3,6)).join(' '));
  };



  /*==========  FILL IN THE FORM  ==========*/

  fillForm = function() {
    data = new FormData(win.Faker);

    $('[name*=name]').not(':hidden').val(data.name);
    $('[name*=surname]').not(':hidden').val(data.surname);
    $('[name*=last_name]').not(':hidden').val(data.surname);
    $('[name*=username]').not(':hidden').val(data.username);
    $('[name*=cc]').not(':hidden').val(data.cc);
    $('[name*=exp1]').not(':hidden').val(data.exp1);
    $('[name*=exp2]').not(':hidden').val(data.exp2);
    $('[name*=cvv]').not(':hidden').val(data.cvv);
    $('[name*=address]').not(':hidden').val(data.address1);
    $('[name*=address2]').not(':hidden').val(data.address1);
    $('[name*=street_address]').not(':hidden').val(data.address1);
    $('[name*=streetaddress]').not(':hidden').val(data.address1);
    $('[name*=thoroughfare]').not(':hidden').val(data.address1);
    $('[name*=suburb]').not(':hidden').val(data.address2);
    $('[name*=address2]').not(':hidden').val(data.address2);
    $('[name*=secondary_address]').not(':hidden').val(data.address2);
    $('[name*=secondaryaddress]').not(':hidden').val(data.address2);
    $('[name*=premise]').not(':hidden').val(data.address2);
    $('[name*=mail]').not(':hidden').val(data.email);
    $('[name*=city]').not(':hidden').val(data.city);
    $('[name*=locality]').not(':hidden').val(data.city);
    $('[name*=province]').not(':hidden').val(data.state);
    $('[name*=state]').not(':hidden').val(data.state);
    $('[name*=province]').not(':hidden').val(data.state);
    $('[name*=administrative_area]').not(':hidden').val(data.state);
    $('[name*=zip]').not(':hidden').val(data.zip);
    $('[name*=postalcode]').not(':hidden').val(data.zip);
    $('[name*=postal_code]').not(':hidden').val(data.zip);
    $('[name*=pw]').not(':hidden').val(data.password);
    $('[type*=password]').not(':hidden').val(data.password);
    $('[name*=pw-repeat]').not(':hidden').val(data.password);
    $('[name*=pw-again]').not(':hidden').val(data.password);
    $('[name*=password-repeat]').not(':hidden').val(data.password);
    $('[name*=password-again]').not(':hidden').val(data.password);
    $('[name*=title]').not(':hidden').val(data.title);
    $('[name*=contactnumber]').not(':hidden').val(data.phoneNumber);
    $('[name*=contact_number]').not(':hidden').val(data.phoneNumber);
    $('[name*=fullname]').not(':hidden').val(data.fullName);
    $('[name*=full_name]').not(':hidden').val(data.fullName);
    $('[name*=phone]').not(':hidden').val(data.phoneNumber);
    $('[name*=company]').not(':hidden').val(data.company);
    $('[name*=client]').not(':hidden').val(data.company);
    $('[name*=attention]').not(':hidden').val(data.name);

    data.randomizeRadio($('[name="radio-choice"]'));

    // Randomize all select boxes
    $('select').not(':hidden').each(function() {
      data.randomizeSelect(this);
    });

    // Randomize all checkboxes
    $('input[type="checkbox"').not(':hidden').each(function() {
      data.randomizeCheckbox(this);
    });

    // Randomize all textareas
    $('textarea').not(':hidden').each(function() {
      data.randomizeParagraph(this);
    });

    // Randomize all emails
    $('input[type="email"').not(':hidden').each(function() {
      data.randomizeEmail(this);
    });
      
    // Randomize quantity amounts
    $('[name*=quantity]').not(':hidden').each(function() {
      data.randomizeNumber(this, 0, 100);
    });
      
    // Randomize quantity amounts
    $('[name*=description]').not(':hidden').each(function() {
      data.randomizePhrase(this);
    });

  };

}(window, window.document, window.jQuery));
