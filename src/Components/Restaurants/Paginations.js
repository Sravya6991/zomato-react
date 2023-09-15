import React, {useState, useEffect} from 'react'
import axios from 'axios';

const url = "http://localhost:8000/restaurants/";

const Paginations = (props) => {
    const [pageNo, setPageNo] = useState(1)
    const [totalCards, setTotalCards] = useState()
    // const [rest, setRest] = useState({})
    let currPage = pageNo;

    useEffect(() => {
        const mealId = sessionStorage.getItem("mealId")
        let pageurl = `${url}${mealId}`
        axios.get(pageurl).then((res) => {
            console.log(res.data)
            setTotalCards(res.data.length)
        })
    }, [])

    const handlePage = (pageNo) => {
        const mealId = sessionStorage.getItem("mealId")
        if(pageNo > 1) return;

        setPageNo(pageNo) 
        currPage = pageNo;
        console.log("curr:",currPage)
        
        axios.get(`${url}${mealId}?page=${pageNo}`).then((res)=>props.restPerPage(res.data))
    }

    const getPages = () => {
        // const noOfPages = totalPages;
        let pages =[]
        for(let i=0; i<totalCards; i++) {
            pages.push(
            <button className='page-item' onClick={() => handlePage(i+1)}>
                {i+1}
            </button>
            )
        }
        return pages
    }
    

  return (
    <div className="mb-4" id="pagination">
        {(totalCards > 0) ?
        (
            <div className='pagination justify-content-center' id='pagination-items'>
                <button className='page-item' onClick={() => handlePage(--currPage)}> &lt; </button>
                    {getPages()}
                <button className='page-item' onClick={()=>handlePage(++currPage)}> &gt; </button>
            </div>
        ) : <p>null</p> }

    </div>
  )
}

export default Paginations