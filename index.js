require("dotenv").config();
var express=require('express');
const stripe=require('stripe')(process.env.STRIPE_SECRIT)
const port=3000||process.env.PORT;
var app=express();
app.set('view engine','ejs');
app.get('/',(req,res)=>{
res.render('index')
});
var bodyparse=require('body-parser');
app.use(
    bodyparse.urlencoded({
        extended:false
    })
);
app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      ui_mode: 'embedded',
      return_url: 'https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}'
    });
  
    res.send({clientSecret: session.client_secret});
  });
// app.post('/create-checkout-session', async (req, res) => {
//     try {
//         // const price = req.body.price;

//         const session = await stripe.checkout.sessions.create({
//             line_items: [{
//                 price_data: {
//                     currency: 'usd',
//                     product_data: {
//                         name: 'عسل سدر طبيعي',
//                     },
//                     unit_amount: 10 * 50 // تحويل السعر إلى سنتات
//                 },
//                 quantity: 1
//             }],
//             mode: 'payment',
//             ui_mode: 'embedded',
//             success_url: 'https://ghidhaalruwh.netlify.app/complate',
//             cancel_url: 'https://ghidhaalruwh.netlify.app/cancel'
//         });


//       res.redirect(session.url); // توجيه المستخدم إلى صفحة الدفع في Stripe

//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Error occurred');
//     }
// });
app.get('/complate',async(req,res)=>{
    try{
      await  paypal.capturpayment(req.query.token)
     res.send('secessful')

    }catch(error){
        res.send('error : '+error)
    }
})
app.get('/cancel',(rez,res)=>{
    res.redirect('/')
    })
app.listen(port,(req,res)=>{console.log(`that is server ${port}`);});
