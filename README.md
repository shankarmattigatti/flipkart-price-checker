# Flipkart Price Checker

A Node.js application to track Flipkart's prices of a given product and sends email if the product price drop then the minimum price. 

### Prerequisite

Configure the email settings in config.json file

### How to check

Run the following command:
<pre>
$ node index.js flipkart_product_url min_price
</pre>


### Example
- Visit www.flipkart.com, search for the product then grab the URL.
- Run following command:

<pre>

$ node index.js https://www.flipkart.com/apple-iphone-11-pro-space-grey-64-gb/p/itm7e24c1c560208 100000

</pre>