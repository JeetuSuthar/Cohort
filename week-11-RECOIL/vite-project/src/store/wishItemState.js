import { atom } from "recoil";
export const wishItemState =atom({
    key:'wishItemState',
    default:[
        {
            id: 1,
            name: "product1",
            price: "199",
            img: "https://m.media-amazon.com/images/I/61-r9zOKBCL._AC_UY327_FMwebp_QL65_.jpg"
          },
         
    ]
})