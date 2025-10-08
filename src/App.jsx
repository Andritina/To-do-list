import { Input } from "./components/forms/Input.jsx";
import { Checkbox } from "./components/forms/Checkbox.jsx";
import { ProductCategoryRow } from "./components/products/ProductCategoryRow.jsx";
import { ProductRow } from "./components/products/ProductRow.jsx";
import { useState } from "react";
import { Range } from "./components/forms/Range.jsx";

const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
]

function App() {

    const [showStockedOnly, setShowStockedOnly] = useState(false)
    const [search, setSearch] = useState('')
    const[searchRange, setSearchRange] = useState(400)

    const visibleProducts = PRODUCTS.filter(product => {
        
        const price = parseFloat(product.price.replace("$",""))
        
        if (showStockedOnly && !product.stocked) {
            return false
        }

        if (search && !product.name.includes(search)) {
            return false
        }

        if (price > searchRange) {
            return false
        }

        return true
    })

    return <div className="container my-3">
        <SearchBar 
            showStockedOnly={showStockedOnly} 
            onStockedOnlyChange={setShowStockedOnly}
            search={search}
            onSearchChange={setSearch}
            searchRange={searchRange}
            setSearchRange={setSearchRange}
        />
        <ProductTable products={visibleProducts}/>
    </div>
}

function SearchBar({showStockedOnly, onStockedOnlyChange, search, onSearchChange, searchRange, setSearchRange}) {
    return <div>
        <div className="mb-3">
            <Input
                value={search}
                onChange={onSearchChange}
                placeholder="Recherche..."
            />

            <Range 
                value = {searchRange}
                onChange={setSearchRange}
            />
            
            <p>Prix max : {searchRange}$</p>

            <Checkbox 
                id="stocked"
                checked={showStockedOnly} 
                onChange={onStockedOnlyChange} 
                label="Only show products in stock"
            />
        </div>
        
    </div>
}

function ProductTable({products}) {

    const rows = []

    let lastCategory = null

    for (let product of products) {
        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow 
                    category={product.category} 
                    key={product.category} 
                />
            )
        }
        lastCategory = product.category
        rows.push(
            <ProductRow
                product={product} 
                key={product.name} 
            />
        )
    }

    return <table className="table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prix</th>
            </tr>
        </thead>

        <tbody>
            {rows}
        </tbody>

    </table>
}

export default App
