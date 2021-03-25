// 1. Функция принимает параметром неопределённое колличество
// целых положительных чисел и возвращает их сумму.
const sum = (...args: Array<number>) => {
    return args.reduce((acc, el) => acc + el)
}
export default sum

// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "01", если треугольник равнобедренный,
//  - "10", если треугольник равносторонний,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number) {
    if (a + b > c && b + c > a && a + c > b) {
        if (a===b && b===c) {
            return "10"
        } else if(a ===b || b===c || c===a){
            return "01"
        } else {return"11"}
    } else { return "00"}
}

//3.
export function getSum(n:number) {
    let i = JSON.stringify(n)
    let arr = i.split('')
    return arr.reduce((acc, el) => acc + Number(el), 0)
}

// 4. Функция принимает isEvenIndexSumGreater параметром массив чисел.
// Если сумма чисел с чётным индексом (0 как чётный индекс) больше суммы чисел с нечётными индексами,
// то функция возвращает true. В противном случае - f
export function isEvenIndexSumGreater (arr: Array<number>) {
   let summCh = 0;
   let summNotCh = 0;

    for (let i=0; i< arr.length; i++){
        if (i%2===0) {
            summCh = summCh+arr[i]
        } else {summNotCh=summNotCh+arr[i]}
    }
    return summCh>summNotCh
}

// 5. Функция isSquareGreater принимает два параметра: площадь круга и
// площадь квадрата. Функция должна возвращать true если круг поместится в
// квадрате и false в противном случае.

export function isSquareGreater (s1: number, s2: number) {
    if (Math.sqrt(s1) > Math.sqrt((s2/3.14))) {
        return true
    } else {return false}
}

// 6. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]

export function getBanknoteList (amountOfMoney: number): Array<number> {
    const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
    for (let i=0; i>banknotes[i]; i++){
       if (amountOfMoney%banknotes[i] === 0){}
    }
    return [1]
}