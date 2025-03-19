

import React from 'react'
import _ from "lodash"


export default function Pagination({totalPage,page,setPage,limit,siblings}) {

    // returnPaginationPage
    const returnPaginationPage = (totalPage ,page ,limit,siblings) => {
    
        let totalPageNoInArrray = 7 + siblings

        if(totalPageNoInArrray >= totalPage)
        {
            return _.range(1 ,totalPage + 1)
        }

        let leftSiblingsIndex = Math.max(page - siblings , 1)

        let rightSiblingsIndex = Math.min(page + siblings, totalPage)


        let showLeftDots = leftSiblingsIndex > 2 ;

        let showRightDots = rightSiblingsIndex < totalPage - 2

        if(!showLeftDots && showRightDots)
        {
            let leftItemsCount = 3 + 2 * siblings ;

            let leftRange = _.range(1 ,leftItemsCount + 1)

            return [...leftRange ,"...", totalPage]
        }
        else if(showLeftDots && !showRightDots)
        {
            let rightItemsCount = 3 + 2 * siblings

            let rightRange = _.range(totalPage - rightItemsCount + 1,totalPage +1)

            return [1, "...", ...rightRange]
        }
        else
        {
            let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1)

            return[1,"...",...middleRange,"...",totalPage]
        }

    }

    let array = returnPaginationPage(totalPage,page,limit,siblings)

    // handlePageChange
    const handlePageChange = (value) => {

        if(value === "&laquo;")
        {
            setPage(1)
        }
        else if(value === "&lsquo;")
        {
            if(page !== 1)
            {
                setPage(page -1)
            }
        }
        else if(value === "&raquo;" )
        {
            if(page !== totalPage)
            {
                setPage(page+1)
            }
        }
        else if(value === "&rsquo;")
        {
            setPage(totalPage)
        }
        else
        {
            setPage(value)
        }

    }

  return (

    <div className="w-full flex justify-center items-center">

            <ul className="flex py-4 ">

                <li className="border border-red-200 bg-red-50 text-primary flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-slate-200 rounded-l-md">
                    <span onClick={() => handlePageChange("&laquo;")} className="">&laquo;</span>
                </li>

                <li className="border border-red-200 bg-red-50 text-primary flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-slate-200">
                    <span onClick={() => handlePageChange("&lsquo;")} className="">&lsaquo;</span>
                </li>

                {array.map((value,index) => {

                    if(value === page)
                    {
                        return (
                            <li key={index} className="font-bold border border-red-200 flex items-center justify-center h-10 w-10 cursor-pointer bg-primary text-white">
                                <span onClick={() => handlePageChange(value)} className="">{value}</span>
                            </li>
                        )
                    }
                    else
                    {
                        return (
                            <li key={index} className="font-bold border border-red-200 bg-red-50 flex items-center justify-center h-10 w-10 cursor-pointer text-primary">
                                <span onClick={() => handlePageChange(value)} className="">{value}</span>
                            </li>
                        )
                    }

                })}
                
                <li className="border border-red-200 bg-red-50 text-primary flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-slate-200">
                    <span onClick={() => handlePageChange("&raquo;")} className="">&rsaquo;</span>
                </li>

                <li className="border border-red-200 bg-red-50 text-primary flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-slate-200 rounded-r-md">
                    <span onClick={() => handlePageChange("&rsquo;")} className="">&raquo;</span>
                </li>

            </ul>

   </div>

  )

}
