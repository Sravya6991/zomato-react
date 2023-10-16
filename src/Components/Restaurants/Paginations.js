import React, {useState, useEffect} from 'react'
import axios from 'axios';

const url = "http://localhost:8000/restaurants/";

const Paginations = (props) => {
    const [pageNo, setPageNo] = useState(1);
    const [totalCards, setTotalCards] = useState("");

    const mealId = sessionStorage.getItem("mealId");

    const itemsPerPage = 2;
    let currPage = pageNo;
    let PageLength = Math.ceil(totalCards/itemsPerPage);

    const startIndex = itemsPerPage*currPage - itemsPerPage;
    const lastIndex = itemsPerPage*currPage;

    console.log("cur-page: ", currPage);

    useEffect(()=> {
        axios.get(`${url}${mealId}?page=${currPage}`)
            .then((res)=>{
                console.log(res.data)
                setTotalCards(res.data.length);
                const result = res.data.slice(startIndex, lastIndex);
                return props.restPerPage(result)
            });
    },[pageNo]);

    const getPages = () => {
        const pages =[];
        for(let i=0; i < PageLength; i++) {
            pages.push(
            <button key={i} className='page-item' onClick={()=>handlePage(i+1)}>
                {i+1}
            </button>
            )
        }
        return pages
    }

    const handlePage = (pageNumber) => {
        if(pageNumber < 1) {
          pageNumber = 1
        }
        if(pageNumber > PageLength) {
            pageNumber = PageLength
        }
        setPageNo(pageNumber);
        axios.get(`${url}${mealId}?page=${currPage}`)
            .then((res)=>{
                const result = res.data.slice(startIndex, lastIndex);
                return props.restPerPage(result)
            }
        );
      }
    
    return (
            <div className='mb-4' id='pagination'>
               <div className='pagination justify-content-center' id='pagination-items'>
                    <button className='page-item' onClick={()=>handlePage(--currPage)}> &lt; </button>
                    { getPages() }
                    <button className='page-item' onClick={()=>handlePage(++currPage)}> &gt; </button>
                </div> 
            </div>
        )
}

export default Paginations