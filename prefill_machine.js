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

    $('[name*=name]').val(data.name);
    $('[name*=surname]').val(data.surname);
    $('[name*=last_name]').val(data.surname);
    $('[name*=username]').val(data.username);
    $('[name*=cc]').val(data.cc);
    $('[name*=exp1]').val(data.exp1);
    $('[name*=exp2]').val(data.exp2);
    $('[name*=cvv]').val(data.cvv);
    $('[name*=address]').val(data.address1);
    $('[name*=address2]').val(data.address1);
    $('[name*=street_address]').val(data.address1);
    $('[name*=streetaddress]').val(data.address1);
    $('[name*=thoroughfare]').val(data.address1);
    $('[name*=suburb]').val(data.address2);
    $('[name*=address2]').val(data.address2);
    $('[name*=secondary_address]').val(data.address2);
    $('[name*=secondaryaddress]').val(data.address2);
    $('[name*=premise]').val(data.address2);
    $('[name*=mail]').val(data.email);
    $('[name*=city]').val(data.city);
    $('[name*=locality]').val(data.city);
    $('[name*=province]').val(data.state);
    $('[name*=state]').val(data.state);
    $('[name*=province]').val(data.state);
    $('[name*=administrative_area]').val(data.state);
    $('[name*=zip]').val(data.zip);
    $('[name*=postalcode]').val(data.zip);
    $('[name*=postal_code]').val(data.zip);
    $('[name*=pw]').val(data.password);
    $('[type*=password]').val(data.password);
    $('[name*=pw-repeat]').val(data.password);
    $('[name*=pw-again]').val(data.password);
    $('[name*=password-repeat]').val(data.password);
    $('[name*=password-again]').val(data.password);
    $('[name*=title]').val(data.title);
    $('[name*=contactnumber]').val(data.phoneNumber);
    $('[name*=contact_number]').val(data.phoneNumber);
    $('[name*=fullname]').val(data.fullName);
    $('[name*=full_name]').val(data.fullName);
    $('[name*=phone]').val(data.phoneNumber);
    $('[name*=company]').val(data.company);
    $('[name*=client]').val(data.company);    
    $('[name*=attention]').val(data.name);  

    data.randomizeRadio($('[name="radio-choice"]'));

    // Randomize all select boxes
    $('select').each(function() {
      data.randomizeSelect(this);
    });

    // Randomize all checkboxes
    $('input[type="checkbox"').each(function() {
      data.randomizeCheckbox(this);
    });

    // Randomize all textareas
    $('textarea').each(function() {
      data.randomizeParagraph(this);
    });

    // Randomize all emails
    $('input[type="email"').each(function() {
      data.randomizeEmail(this);
    });
      
    // Randomize quantity amounts
    $('[name*=quantity]').each(function() {
      data.randomizeNumber(this, 0, 100);
    });
      
    // Randomize quantity amounts
    $('[name*=description]').each(function() {
      data.randomizePhrase(this);
    });

  };

}(window, window.document, window.jQuery));


/*
Exception: missing ) after argument list
@Scratchpad/2:187
*/