"use strict";
function sum(u1, u2) {
    return u1.age + u2.age;
}
const age = sum({
    name: "Jeetu",
    age: 20
}, {
    name: "Harkirat",
    age: 30
});
console.log(age);
