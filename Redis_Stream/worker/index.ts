import { createClient } from "redis"
async function main() {
    const client = await createClient({
        url: "redis://localhost:6379"
    })
        .on("error", (err) => console.log("redis err", err))
        .connect();

    const res = await client.xReadGroup('africa', 'africa-1', {
        key: 'betteruptime:websites',
        id: '>'
    }, {
        COUNT: 2
    })
    if(!res){
        client.destroy();
        return;
    }
    //@ts-ignore
    console.log((res[0]).messages);
    client.destroy();
}
main();