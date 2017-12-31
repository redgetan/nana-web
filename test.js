const paypal = require('paypal-rest-sdk')

const generate = require('paypal-rest-sdk/lib/generate');
const api = require('paypal-rest-sdk/lib/api');

function marketMerchant() {
    var baseURL = '/v1/customer/partners/merchant-accounts';
    var operations = ['create'];

    var ret = {
        baseURL: baseURL,
        /**
         * Execute(complete) a PayPal or payment that has been approved by the payer
         * @param  {String}   id     Payment identifier
         * @param  {Object}   data   Transaction details if updating a payment
         * @param  {Object|Function}   config     Configuration parameters e.g. client_id, client_secret override or callback
         * @param  {Function} cb     
         * @return {Object}          Payment object for completed PayPal payment
         */
        execute: function execute(id, data, config, cb) {
            api.executeHttp('POST', this.baseURL + id + '/execute', data, config, cb);
        }
    };
    ret = generate.mixin(ret, operations);
    return ret;
}


paypal.marketMerchant = marketMerchant()





paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AYV6g-KGvlAR0hTaaynBer5nAg4_XjdymmSNHwvdL1Ylb6VRzJojJrrjLogRtQZ7LVpy979bFOX_kNEw',
  'client_secret': 'EKiJK5JmZfAK_xFKbxBqjRfS1oWXmGKXloW_8DD9IH9OCzLDYWeSMljCrm3gVvwCMlCWIKWtyLm48Cdf'
})

const newMerchantJson = {
  "owner_info": {
  "email": "sydney@example.com",
  "name": {
    "prefix": "Mr",
    "given_name": "Victoria",
    "surname": "Asmania",
    "middle_name": "T.",
    "suffix": ""
  },
  "country_code_of_nationality": "AU",
  "addresses": [
    {
    "type": "HOME",
    "line1": "200 Broadway Av",
    "line2": "",
    "city": "West Beach",
    "state": "South Australia",
    "country_code": "AU",
    "postal_code": "5024"
    }
  ],
  "date_of_birth": "1990-01-01",
  "phones": [
    {
    "type": "HOME",
    "country_code": "61",
    "national_number": "0491570156",
    "extension_number": "123"
    },
    {
    "type": "MOBILE",
    "country_code": "61",
    "national_number": "0491570156",
    "extension_number": "123"
    }
  ],
  "identifications": [
    {
    "value": "LICENSE_ABCD123",
    "type": "DRIVERS_LICENSE",
    "issuer_country_code": "AU",
    "masked": false
    }
  ]
  },
  "business_info": {
  "type": "ASSOCIATION",
  "sub_type": "ASSO_TYPE_INCORPORATED",
  "names": [
    {
    "type": "LEGAL",
    "name": "AU Business"
    },
    {
    "type": "DOING_BUSINESS_AS",
    "name": "Doing Business As Name"
    }
  ],
  "identifications": [
    {
    "value": "123423456723",
    "type": "ASSOCIATION_NUMBER",
    "issuer_country_code": "AU",
    "masked": false
    }
  ],
  "addresses": [
    {
    "type": "REGISTERED_OFFICE",
    "line1": "200 Broadway Av",
    "line2": "",
    "city": "West Beach",
    "state": "South Australia",
    "country_code": "AU",
    "postal_code": "5024"
    },
    {
    "type": "MAILING_ADDRESS",
    "line1": "200 Broadway Av",
    "line2": "",
    "city": "West Beach",
    "state": "South Australia",
    "country_code": "AU",
    "postal_code": "5024"
    },
    {
    "type": "WORK",
    "line1": "200 Broadway Av",
    "line2": "",
    "city": "West Beach",
    "state": "South Australia",
    "country_code": "AU",
    "postal_code": "5024"
    }
  ],
  "phones": [
    {
    "type": "WORK",
    "country_code": "61",
    "national_number": "0491570156",
    "extension_number": "123"
    },
    {
    "type": "BUSINESS",
    "country_code": "61",
    "national_number": "0491570156"
    }
  ],
  "category": "1004",
  "sub_category": "2940",
  "merchant_category_code": "3011",
  "date_business_established": "2001-01-17",
  "date_of_registration": "2011-04-17",
  "dispute_email": "dispute@example.com",
  "business_sales_details": {
    "average_price": {
    "minimum_amount": {
      "currency_code": "AUD",
      "value": "10"
    },
    "maximum_amount": {
      "currency_code": "AUD",
      "value": "100"
    }
    },
    "average_monthly_volume": {
    "minimum_amount": {
      "currency_code": "AUD",
      "value": "1000"
    },
    "maximum_amount": {
      "currency_code": "AUD",
      "value": "2000"
    }
    },
    "sales_venues": [
    {
      "type": "EBAY",
      "ebay_id": "ebayid123",
      "description": "ebay venue"
    },
    {
      "type": "ANOTHER_MARKET_PLACE",
      "description": "description"
    }
    ],
    "website": "https://www.example.AU.com",
    "revenue_from_online_sales": {
    "minimum_percent": 0,
    "maximum_percent": 25
    }
  },
  "customer_service": {
    "email": "customer-service@example.com",
    "phone": {
    "country_code": "61",
    "national_number": "0491570156",
    "extension_number": "123"
    },
    "message": [
    {
      "type": "ONLINE",
      "headline": "Your online purchase",
      "logo_image_url": "https://www.example.com/logo/online/",
      "service_image_url": "https://www.example.com/service/online/",
      "seller_message": "Your online purchase"
    },
    {
      "type": "RETAIL",
      "headline": "Your retail purchase",
      "logo_image_url": "https://www.example.com/logo/retail/",
      "service_image_url": "https://www.example.com/service/retail/",
      "seller_message": "Your retail purchase"
    }
    ]
  },
  "country_code_of_incorporation": "AU",
  "stakeholders": [
    {
    "type": "CHAIRMAN",
    "country_code_of_nationality": "AU",
    "date_of_birth": "1992-01-01",
    "name": {
      "prefix": "Mr",
      "given_name": "Victoria",
      "surname": "Asmania",
      "middle_name": "T.",
      "suffix": "Jr."
    },
    "addresses": [
      {
      "type": "WORK",
      "line1": "200 Broadway Av",
      "line2": "",
      "city": "West Beach",
      "state": "South Australia",
      "country_code": "AU",
      "postal_code": "5024"
      }
    ],
    "phones": [
      {
      "type": "WORK",
      "country_code": "61",
      "national_number": "0491570156",
      "extension_number": "123"
      }
    ],
    "place_of_birth": {
      "city": "West Beach",
      "country_code": "AU"
    },
    "identifications": [
      {
      "value": "LICENSE_ABCD123",
      "type": "DRIVERS_LICENSE",
      "issuer_country_code": "AU",
      "masked": false
      }
    ]
    },
    {
    "type": "SECRETARY",
    "country_code_of_nationality": "AU",
    "date_of_birth": "1992-01-01",
    "name": {
      "prefix": "Mr",
      "given_name": "John",
      "surname": "Snow",
      "middle_name": "T.",
      "suffix": "Jr."
    },
    "addresses": [
      {
      "type": "WORK",
      "line1": "200 Broadway Av",
      "line2": "",
      "city": "West Beach",
      "state": "South Australia",
      "country_code": "AU",
      "postal_code": "5024"
      }
    ],
    "phones": [
      {
      "type": "WORK",
      "country_code": "61",
      "national_number": "0491570156",
      "extension_number": "123"
      }
    ],
    "place_of_birth": {
      "city": "West Beach",
      "country_code": "AU"
    },
    "identifications": [
      {
      "value": "LICENSE_ABCD123JS",
      "type": "DRIVERS_LICENSE",
      "issuer_country_code": "AU",
      "masked": false
      }
    ]
    },
    {
    "type": "TREASURER",
    "country_code_of_nationality": "AU",
    "date_of_birth": "1992-01-01",
    "name": {
      "prefix": "Mr",
      "given_name": "Josh",
      "surname": "Snow",
      "middle_name": "T.",
      "suffix": "Jr."
    },
    "addresses": [
      {
      "type": "WORK",
      "line1": "200 Broadway Av",
      "line2": "",
      "city": "West Beach",
      "state": "South Australia",
      "country_code": "AU",
      "postal_code": "5024"
      }
    ],
    "phones": [
      {
      "type": "WORK",
      "country_code": "61",
      "national_number": "0491570156",
      "extension_number": "123"
      }
    ],
    "place_of_birth": {
      "city": "West Beach",
      "country_code": "AU"
    },
    "identifications": [
      {
      "value": "LICENSE_ABCD123JSY",
      "type": "DRIVERS_LICENSE",
      "issuer_country_code": "AU",
      "masked": false
      }
    ]
    }
  ]
  },
  "account_status": "A",
  "account_currency": "AUD",
  "secondary_currency": [
  "USD"
  ],
  "financial_info": {
  "bank_accounts": [
    {
    "transfer_type": "NORMAL",
    "account_number": "11111113",
    "account_type": "CHECKING",
    "currency_code": "AUD",
    "identifiers": [
      {
      "type": "ROUTING_NUMBER_1",
      "value": "645"
      },
      {
      "type": "ROUTING_NUMBER_2",
      "value": "000"
      }
    ],
    "bank_name": "Bank of Australia",
    "branch_location": {
      "city": "Sydney",
      "country_code": "AU"
    }
    }
  ]
  },
  "payment_receiving_preferences": {
  "block_unconfirmed_us_address_payments": true,
  "block_non_us_payments": true,
  "block_echeck_payments": true,
  "block_cross_currency_payments": true,
  "block_send_money_payments": true,
  "alternate_payment_url": "https://www.example.com/alternate/",
  "display_instructions_text_input": true,
  "cc_soft_descriptor": "USCCSOFTDES",
  "cc_soft_descriptor_extended": "USCCSOFTDESEXT"
  },
  "account_relations": [
  {
    "type": "PARTNER"
  }
  ],
  "account_permissions": [
  {
    "permissions": [
    "EXPRESS_CHECKOUT",
    "RECURRING_PAYMENT",
    "EXTENDED_PRO_PROCESSING",
    "EXCEPTION_PROCESSING",
    "MASS_PAY",
    "ENCRYPTED_WEBSITE_PAYMENTS"
    ]
  }
  ],
  "timezone": "Australia/Adelaide",
  "partner_merchant_external_id": "abc123",
  "loginable": false,
  "partner_tax_reporting": true
}

const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://return.url",
        "cancel_url": "http://cancel.url"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": "1.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
}


// paypal.payment.create(create_payment_json, (error, payment) => {
//     if (error) {
//         throw error;
//     } else {
//         console.log("Create Payment Response");
//         console.log(payment);
//     }
// })
