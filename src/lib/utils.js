export let urlMatch = (url) => {
  return url.match(/(\d+)\/$/)[1]
}

export let filter = (arr, f) => {
    return arr.filter(el => el.name.match(new RegExp(`^${f}`, 'i')))
}

export let slicer = (arr, i, n) => {
    let start = i * n - n;
    let end = start + n;

    return arr.slice(start, end)
}

export let sortBy = (arr) => {
    return arr.sort((a, b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
        }
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
        }
        return 0;
    })
}

export let capitalizeFirst = (str) => {
    return str.split('').map((s, i) =>
        i === 0 ? s.toUpperCase() : s
    ).join('')
}
