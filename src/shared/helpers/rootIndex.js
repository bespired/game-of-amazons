const RootIndex = {

    get(){
        let rootSheetIdx = null
        Object.values(document.styleSheets).forEach( (sheet, idx) => {
            if (!sheet.href){
                let root = Object.values(sheet.cssRules).find( rule => rule.selectorText === ':root')
                if (root) {
                    rootSheetIdx = idx
                }
            }
        })
        return rootSheetIdx
    },

}


export default RootIndex;