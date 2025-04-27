import { useState, useEffect } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const ProductCart = ({ image, title }) => {
  return <div className='flex flex-wrap h-80 max-w-80 p-4 m-4 justify-center shadow-xl '>
    <img src={image} alt="product image" className='h-56 w-full' />
    <span>{title}</span>
  </div>
}

const PAGE_SIZE = 15;

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=0");
    const json = await data.json();
    setProducts(json.products);
  }

  const totalProducts = products.length;
  const numberOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n) => {
    setCurrentPage(n);
  }

  const decreasePageNumber = () => {
    setCurrentPage((prev) => prev - 1);
  }

  const increasePageNumber = () => {
    setCurrentPage((prev) => prev + 1);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return !products.length ? <h1 className='text-center text-6xl mt-10'>No products found</h1> : (
    <>
      <div className='font-bold text-4xl text-center m-8'>Pagination using ReactJS</div>
      <div className='flex flex-wrap justify-center'>
        <button disabled={currentPage === 0} className='mx-2 cursor-pointer' onClick={(r) => decreasePageNumber()}>
          <FaChevronLeft size={20} />
        </button>
        {[...Array(numberOfPages).keys()].map((n) => (
          <button
            key={n}
            className={`border-b p-2 w-10 lg:m-2 md:mx-1 sm:mx-0.5 text-center hover:bg-blue-50 rounded-2xl cursor-pointer ${n === currentPage ? "bg-blue-50" : ""}`}
            onClick={() => handlePageChange(n)}>
            {n}
          </button>
        ))}
        <button disabled={currentPage === numberOfPages - 1} className='mx-2 cursor-pointer' onClick={() => increasePageNumber()}>
          <FaChevronRight size={20} />
        </button>
      </div>
      <div className='flex flex-wrap justify-center'>
        {
          products.slice(start, end).map((p) => (
            <ProductCart key={p.id} image={p.thumbnail} title={p.title} />
          ))
        }
      </div>
    </>
  )
}

export default App
