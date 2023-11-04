export function hardSpaceGenerator (inputText: string) {
    const hardSpaceCondition = / [a,i,o,w,z] /gi;
    function replacer(match: string) {
        return match.slice(0,2) + "\xa0";
    }

    const outputText = inputText.replaceAll(hardSpaceCondition, replacer);
    return outputText;
}