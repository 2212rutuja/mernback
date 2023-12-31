
import paytmchecksum from '../paytm/PaytmChecksum.js'
import { paytmParams,paytmMerchantKey} from '../index.js'
//import formidable from 'formidable' // to parse form
import formidable from 'formidable'
import https from 'https'

export const addPaymentGateway = async(request, response) =>{
    const paytmCheksum =  await paytmchecksum.generateSignature(paytmParams,paytmMerchantKey)
    try{
        
        const params= {
            ...paytmParams,
            'CHECKSUMHASH': paytmCheksum
        }

        response.status(200).json(params)
    }catch(error){
        response.status(500).json({error:error.message})
    }

}

export const paytmResponse = (request,response)=>{
    const form = new formidable.IncomingForm()
    console.log(form)

    let paytmCheckSum = request.body.CHECKSUMHASH
    delete request.body.CHECKSUMHASH
    let isVerifySignature = paytmchecksum.verifySignature(request.body,paytmMerchantKey,paytmCheckSum)
    if(isVerifySignature){
        let paytmParams = {}
        paytmParams['MID'] = request.body.MID
        paytmParams['ORDER_ID'] = request.body.ORDER_ID

        paytmchecksum.generateSignature(paytmParams,paytmMerchantKey).then(function(checksum){
            paytmParams['CHECKSUMHASH']= checksum
            let post_data = JSON.stringify(paytmParams)
            let options = {
                hostname: 'securegw-stage.paytm.in',
                port: 443,
                path: '/order/status',
                headers:{
                    'Content-Type' : 'application/json',
                    'Content-Length': post_data.length
                }
            }
            let res= ""
            let post_req= https.request(options,function(post_res){
                post_res.on('data',function(chunk){
                    res += chunk
                })
                post_res.on('end',function(){
                    let result = JSO.parse(res)
                    response.redirect('http://localhost:3000/')
                    //response.redirect('')
                })
            })
            post_req.write(post_data)
            post_req.end()

        })

    }else{
        console.log('CheckSum Mismatched')
    }
}