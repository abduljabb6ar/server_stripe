require("dotenv").config();
var express=require('express');
const stripe=require('stripe')(process.env.STRIPE_SECRIT)
var app=express();
app.set('view engine','ejs');
app.get('/',(req,res)=>{
res.render('index')
});
app.post('/checkout', async(req,res)=>{
    const sessstion=await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:'عسل سدر طبيعي',
                    },
                    unit_amount:1*50
                },
                quantity:1
            }
        ],
        mode:'payment',
        success_url:'https://ghidhaalruwh.netlify.app/',
        cancel_url:'https://ghidhaalruwh.netlify.app/'
    })

    // console.log(sessstion)
    res.redirect(sessstion.url)
}) 
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
app.listen(8000,(req,res)=>{console.log('that is server 8000');});
