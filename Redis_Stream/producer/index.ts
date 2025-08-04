import {createClient} from "redis"
async function main(){
    const client = await createClient({
        url:"redis://localhost:6379"
    })
    .on("error",(err)=>console.log("redis err",err))
    .connect();

    const res=await  client.xAdd('betteruptime:websites','*',{
        url:"https://jeetusuthar.me",
        id:"4"
    })
    console.log(res);
}
main();