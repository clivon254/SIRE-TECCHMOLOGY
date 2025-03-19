


export const getInitials = (fullName) => {

    const names = fullName?.split(" ")

    const initials = names?.slice(0, 2).map((name) => name[0].toUpperCase())

    const intialStr = initials?.join("")

    return intialStr
}


// getproducts
export const getProducts = (page,limit,products) => {
    
    let array = []

    for(let i = (page -1) * limit ; i < (page * limit) && products[i] ; i++)
    {
        array.push(products[i])
    }

    return array;

}