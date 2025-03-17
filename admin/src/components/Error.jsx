

import React from 'react'

export default function Error({retry}) {

  return (

    <div className="mx-auto max-w-xs space-y-3 mt-10 mb-5">

        <h1 className="text-center text-xl font-bold">
            Connection Failed !!!
        </h1>

        <p className="text-center font-semibold">
            Check your connnection to the internet andt try again 
        </p>

        <div className="text-center">

            <span 
                className="border border-slate-700 px-5 rounded-full font-semibold cursor-pointer"
                onClick={() => retry()}
            >
                Retry
            </span>

        </div>

    </div>

  )

}
