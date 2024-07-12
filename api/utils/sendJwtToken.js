export const sendJwtToken = async (user,status,res,message)=>{
    const token = await user.getJWTtoken()
    res.status(status).cookie("token",token,{httpOnly:true}).json({
        success:true,
        user,
        message,
        token
    })
}