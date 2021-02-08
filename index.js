const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const router = require('koa-router');
const webpush = require('web-push');

const app = new koa();
const route = new router();

app.use(serve(__dirname + '/public'));
app.use(bodyParser({
    jsonLimit: "60mb"
}));

const publicVapidKey = 'BDqvVeR0nyfFTnF-z-If2w3iSsSHNns8xjKKKiM1ugSrBEMB5hNga46WGTbmtCXmpFI53UaCoq1lm-h3itUU13M';
const privateVapidKey = 'kmUs2x0V5iMYIo9nxKy1UbvH787LMaxwGJ3FPd6P1Ow';

webpush.setVapidDetails('mailto:debanjan.dey999@gmail.com', publicVapidKey, privateVapidKey);

//Subscribe Route
route.post('/subscribe', async(ctx) => {
    const subscription = ctx.request.body;
    const payload = JSON.stringify({ title: 'Push Test' });
    ctx.status = 201;
    webpush.sendNotification(subscription, payload).catch((err) => {
        console.log(`Error ocurred while sending Push notification : ${err}`);
    })
})
app.use(route.routes());

app.listen(3500, () => {
    console.log('Server Started at port 3500');
})