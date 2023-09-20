export const withoutSpace = (text) => text.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');

export const makeTemplate = (data) => {
    let string = ''
    data.forEach((e, i) => {
        string += `
                ${++i}.
                Empcode: ${e.empcode}
                Scanid: ${e.scanid}
                Feedtype: ${e.feedtype}
                Type: ${e.type}
                Reason: ${e.comment}
                QA: ${e.qa ? '@' + e.qa : 'N/A'}
                Print: ${e.print || 'N/A'}
            `
    })
    return string
}