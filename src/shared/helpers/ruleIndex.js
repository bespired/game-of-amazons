const RuleIndex = {

    get(idx){
        let rootSheet= document.styleSheets[idx]
        let rdx = Object.values(rootSheet.cssRules).findIndex( rule => rule.selectorText === ':root')

        return rdx
    },

}


export default RuleIndex;