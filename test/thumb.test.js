const obj = {
    fn1 () {
        return 'fn1'
    },

    fn2 () {
        return this.fn1()
    }
}

console.log(obj.fn2())