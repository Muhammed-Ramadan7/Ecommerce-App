function BrandItem({ product, onClick }) {
    return (
      <div onClick={onClick}>
        <div className="shadow-md p-3 text-center hover:shadow-blue-500 transition-all duration-500 border border-spacing-1">
          <img src={product.image} className="w-full object-cover" alt={product.name} />
          <h2 className="text-sm text-green-600 my-2">{product.name}</h2>
        </div>
      </div>
    );
  }
  
  export default BrandItem;
  