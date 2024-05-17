export default  function convertFormat(inputString){
    const upperCaseString = inputString.toUpperCase();
    const groups = [];
    for (let i = 0; i < upperCaseString.length; i += 2) {
        groups.push(upperCaseString.slice(i, i + 2));
    }
    return groups.join('-');
}