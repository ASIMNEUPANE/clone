# clone

register - completed
verify-completed

regenerate -
find email in the auth model
generate new token
update auth model token 

completed

login-

find email in user model
if user find isActive or isVerified is true or not
if that find password match or not
create a token using mailpassword 
if match return a json token

completed 


generateFPtoken

checck email
-if email create token and store ({email,token}) in authmodel
-





forget password 
check email if email
verify token
if verify
update userModel with new password hash the new password
and delete the auth model


check user ,isactive,isemailverified

change password 

-check if user and user is active and verified- userModel

check old password with db password with bycript compare

-hash new password with bycript

update the password in usermodel

reset password-

find id check active and verified
if check 


category model design

name:
slug:


secure routes-

const compare role =



-check req.headers.authoraization
if split token.split("Bearer )[1];
 {data} = verify token;
 get email = data;

 find email in usrer 
 compare roles of email user roles to required roles
 ---


ORDER

-create unique id;
-extract products from payload;
products.map((product)=>{
    extract prodcuts and assign to id, and qunatity = product;

      // decrease the product stock after order made

    find product in in prouct model through id;
        // update the stock
            // write the new Quantity to product stock


      // create the order

})


-----------------pagination step------------
aggregate-

match;
sort ; aggregate for more features

1-facet- allow multiple aggregation;{
metadata: [{$count : "total"}],
data:[
    {$skip(1-1)*5},
   { $limit: 4}       pagination logic;
],
}

2.addfields:{
    total:{
        $arrayElemAt:["metadata.total",0]
    }
}

3.projet:{
    metadata:0   {this will not show in the data}
}

-----------------------------------------------
