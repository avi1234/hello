import {useState} from 'react';
import './App.css';

/*
FilterableProductTable
  SearchBar
  ProductTable
    ProductCategoryRow
    ProductRow
*/

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

function ProductCategoryRow({category}) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({product}) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({products, filterText, inStockOnly}) {
  const rows = [];
  let lastCategory = null;

  products.forEach(product => {

    if(product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    if(inStockOnly && !product.stocked) {
      return;
    }
    
    if(lastCategory !== product.category) {
      rows.push(
        <ProductCategoryRow category={product.category} key={product.category} />
      );
    }
    lastCategory = product.category;

    rows.push(
      <ProductRow product={product} key={product.name} />
    );

  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search.." 
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show in stock
      </label>
    </form>
  );
}

function FilterableProductTable({products}) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} 
      />
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </>
  );
}



function App() {
  return (
    <div className="App">
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}

export default App;
