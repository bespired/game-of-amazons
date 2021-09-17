const Sort = {

    by(arr, by){
        arr.sort(function(a, b) {
            var nameA = a[by].toUpperCase();
            var nameB = b[by].toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        return arr
    },

    byLabel(arr) {
        return this.by(arr, 'label')
    },

}


export default Sort;