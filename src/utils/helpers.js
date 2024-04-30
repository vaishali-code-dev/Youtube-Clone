

export const debouncingFunction = (func, delay) => {

    let timer;

    return function (...args) {
        //  console.log(args)

        let context = this;
        clearTimeout(timer);

        timer = setTimeout(() => { func.apply(context, args) }, delay ? delay : 200)
    }

}
