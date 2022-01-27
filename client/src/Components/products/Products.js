import React, { useEffect,useState } from 'react'
import {Card,Button,Row, Col,DropdownButton,Dropdown,Container} from 'react-bootstrap'
import { getAllCategories, getAllColors, getProducts } from '../../Config/ProductServices'
import ReactStars from 'react-rating-stars-component'
import {ArrowDown, ArrowUp, StarFill} from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate';

export default function Products() {

    const [items,setItems] = useState([]);
    const [colors,setColors] = useState([]);
    const [category,setCategory] = useState([]);
    const navigate = useNavigate();

    const [pagenumber, setPagenumber] = useState(0);
    const productsPerPage = 3;
    const pageVisited = pagenumber * productsPerPage
    const pageCount = Math.ceil(items.length / productsPerPage)

    //Fetching the products categories and colors from database and set them
    useEffect(()=>{
        getProducts().then(res =>{
            console.log(res.data);
            setItems(res.data)
        });
        getAllCategories().then(res =>{
            console.log(res.data);
            setCategory(res.data)
        });
        getAllColors().then(res=>{
            console.log(res.data);
            setColors(res.data)
        })
    },[])

    // const allProducts =()=>{
    //     navigate("/products")
    // }

    //For filtering the products by category
    const filterByCategory = (id) =>{
        getProducts().then(res =>{
            const categories = res.data.filter((items)=>{
                return items.category_id === id;
            });
            setItems(categories)
        })
    }

    //For filtering the products by color 
    const filterByColors = (id) =>{
        getProducts().then(res =>{
            const colors = res.data.filter((items)=>{
                return items.color_id === id;
            });
            setItems(colors)
        })
    }

    //For sorting product by rating
    const sortByRate = ()=>{
        const sort_products = [...items];
        sort_products.sort((a,b)=>(b.product_rating) - (a.product_rating))
        setItems(sort_products);
    }

    //For sorting products in ascending order
    const sortByAsc = () =>{
        const sort_products = [...items];
            sort_products.sort(function(a,b) {
            var item1 = a.product_cost;
            var item2 = b.product_cost;
            console.log(item1,item2)
            if(item1 < item2){
                console.log(item1)
                return -1;
                
            }
            else if(item1 > item2){
                return 1;
            }
            else{
                return 0;
            }
        })
        setItems(sort_products);
        console.log(sort_products)
    }

    //For sorting products in descendin order
    const sortByDesc = () =>{
        const sort_products = [...items];
        // items.sort((a,b)=>parseFloat(b.product_cost) - parseFloat(a.product_cost))
        sort_products.sort(function(a,b) {
            var item1 = a.product_cost;
            var item2 = b.product_cost;
            console.log(item1,item2)
            if(item1 > item2){
                return -1;
            }
            else if(item1 < item2){
                return 1;
            }
            else{
                return 0;
            }
        })
        setItems(sort_products);
        console.log(items)
    }

    const handlePageClick = ({ selected }) => {
        setPagenumber(selected)
    };

    //map function to display all products 
    const displayProducts = items.slice(pageVisited, pageVisited + productsPerPage).map((value,index)=>{
        return(
            <Card style={{ width: "20rem", margin: "1rem" }} className="container" key={index} >
                <a href={`/productDetails/${value._id}`}>
                    <Card.Img src={value.product_image} height="200px" className='m-2 '/>
                </a>
                <Card.Body>
                    <Card.Title className="text-danger">
                        <a href={`/productDetails/${value._id}`} >{value.product_name}</a>
                        </Card.Title>
                    <Card.Text><b>Price:
                        {value.product_cost}/- 
                        </b>
                    </Card.Text>
                    <div style={{marginLeft:"100px"}}>
                        <ReactStars edit={false} isHalf={true} count={5} value={value.product_rating} />
                    </div>
                </Card.Body>
            </Card> 
        )
    })

    return (
        <div>
            <div style={{backgroundImage:"url('./images/product.jpg')",backgroundRepeat: "no-repeat",backgroundSize:"cover"}}>
           {/* Sorting Buttons */}
            <Container className='d-flex pt-2' style={{justifyContent:"right"}}>
                <h4 >Sort By :</h4>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={sortByRate}><a ><StarFill /></a></Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={sortByAsc} ><a ><ArrowUp /></a></Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={()=>sortByDesc()}><a ><ArrowDown /></a></Button>&nbsp;&nbsp;&nbsp;&nbsp;
            </Container>
            <Row>
                <Col md={1}>
                    <Container className="mt-4" >
                        <Button variant="secondary" onClick={()=>navigate("/products")} style={{width:"120px"}}>All Product</Button>
                        {/* Dropdown button for category */}
                        <DropdownButton variant="secondary" menuVariant="dark" title="Categories" className="mt-2">
                            {category.map((item,index)=>{
                                return (
                                    <Dropdown.Item  key={index}
                                    onClick={()=>filterByCategory(item._id)}>
                                        {item.category_name}
                                    </Dropdown.Item>
                                )
                            })}
                        </DropdownButton>
                            {/* Dropdown button for colors */}
                        <DropdownButton variant="secondary" menuVariant="dark" title="Colors" className="mt-2" >
                            {colors.map((item,index)=>{
                                return (
                                    <Dropdown.Item  key={index}
                                    onClick={()=>filterByColors(item._id)}>
                                        {item.color_name}
                                    </Dropdown.Item>
                                )
                            })}
                        </DropdownButton>
                    </Container>
                </Col>
                <Col md={11}>
                    <Row style={{ justifyContent: "center" }}>
                        {/* Calling map function of products here */}
                        {displayProducts}
                    </Row>
                </Col>

                <ReactPaginate
                    breakLabel="..."
                    previousLabel={"< prev"}
                    nextLabel={"next >"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disbaledClassName={"paginationDisabled"}
                    activeClass
                />
            </Row>
            </div>        
        </div>
    )
}
