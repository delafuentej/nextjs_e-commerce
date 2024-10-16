import { searchPaginatedProduct } from "@/actions/product/search-paginated-product";
import { PageNotFound, Pagination, ProductsGrid, SearchInput, Title } from "@/components";

interface Props {
  searchParams: {
    page: string;
    q: string;
  }
}

export default async function Search({searchParams}:Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const q = searchParams.q;
     
  const {products, totalPages} = await searchPaginatedProduct({
    page,
    query: q,
  
  });
  return (
    <>
      <Title
        title='Find a product'
        subtitle={`Searching for ${q || ''}`
        }
        className="mb-2 font-bold"
      />
      <div className="mb-5 max-w-[500px]">
        <SearchInput keep />
      </div>
      {products.length ? (
        <>
          <ProductsGrid products={products} />
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <PageNotFound
        />
      )}
    </>
  );
}