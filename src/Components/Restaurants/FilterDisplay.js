import { Link } from "react-router-dom";
import "../../styles/cuisine.css";

const FilterDisplay = (props) => {
    const rests = props.restaurants;
    
    if(rests) {
        if(rests.length > 0) {
            return (
                <>
                    {rests.map((item) => (
                    <Link to={`/details/${item.restaurant_id}`} style={{textDecoration: "none"}}>
                    <div class="card rests mb-4" key={item._id}>
                        <div class="row mx-auto justify-content-start">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-3">
                                        <div class="text-center card-content">
                                            <img
                                                class="rounded-5 mt-3"
                                                src={item.restaurant_thumb}
                                                alt={item.restaurant_name}
                                                width="160px"
                                                height="140px"
                                                style={{objectFit: "cover"}}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-8 card-content">
                                        <h1 class="h1 card-content-h1 fw-bold ms-1 mt-4">
                                            {item.restaurant_name}
                                        </h1>
                                        {/* <h5 class="fw-semibold ms-1">FORT</h5> */}
                                        <p class="m-1 p-1">
                                            {item.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr class="hr" />
                            <div class="col-12 mt-2 w-75">
                                <table class="table table-borderless mx-4">
                                    <tbody>
                                        <tr>
                                        <td class="heading">CUISINES:</td>
                                        {item.cuisines.map((cus) => (
                                            <td class="fw-semibold cuisine-body">{cus.cuisine_name}</td>
                                        ))} 
                                        </tr>
                                        <tr>
                                        <td class="heading">COST FOR TWO</td>
                                        <td class="fw-semibold cuisine-body">
                                            <span>&#8377;</span>{item.cost}
                                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>    
                    </div>
                    </Link>
                    ))}
                </>
            )
        } else {
            return (
                <div>
                    <p>No restaurants found in this category :(</p>
                </div>
            )
        }
    }
  
};

export default FilterDisplay;
