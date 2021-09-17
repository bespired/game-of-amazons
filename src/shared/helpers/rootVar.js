import RootIndex from "@/shared/helpers/rootIndex.js"
import RuleIndex from "@/shared/helpers/ruleIndex.js"

const RootVar = {

    rootSheetIdx : null,

    set(name, value){

        let rsi = this.rootSheetIdx

        if (!rsi) {
            rsi = RootIndex.get()
            this.rootSheetIdx = rsi
        }

        let styleRuleIdx = RuleIndex.get(rsi)
        let insert  = document.styleSheets[rsi].cssRules.length
        let rules   = document.styleSheets[rsi].cssRules[styleRuleIdx]
        let cssText = rules.cssText
        let defines = midSplit(cssText, '{', '}')
        let cssObj  = keyPairs(defines, ';', ':')

        cssObj[name] = value

        cssText = pairsJoin(cssObj, '; ', ': ')
        let rule = `:root{${cssText}}`

        document.styleSheets[rsi].insertRule(rule, styleRuleIdx+1)
        document.styleSheets[rsi].deleteRule(styleRuleIdx)

    },

}


export default RootVar;