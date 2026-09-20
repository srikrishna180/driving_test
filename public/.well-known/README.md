# Apple Pay domain verification

Apple Pay renders in the Payment Element only once Stripe has registered the
domain, and Stripe will not register it until this file is reachable at

    https://<domain>/.well-known/apple-developer-merchantid-domain-association

**The domain to register is this site, not the booking app.** Checkout moved
here so it carries the customer's own theme, so the Payment Element — and
therefore Apple Pay — runs on this origin. Registering the app's domain
instead looks correct and silently does nothing.

The file is Stripe's, identical for every Stripe account, and served from
their CDN at
<https://stripe.com/files/apple-pay/apple-developer-merchantid-domain-association>.
It has no extension on purpose; Apple fetches that exact path.

To register, from the booking app repo:

    npm run apple-pay -- www.driveacademy.au

Per domain, so each customer clone needs it once. Apple Pay cannot work on
localhost — Apple requires a public HTTPS domain.
