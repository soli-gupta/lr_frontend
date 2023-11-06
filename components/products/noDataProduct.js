
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWRInfinite from 'swr/infinite';
import ProductList from '.';
import Loader from '../common/Loader';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';


const fetcher = (url) => axios.get(url).then(res => res.data);


function NoDataProduct() {

    const router = useRouter();
    const Url = process.env.NEXT_PUBLIC_URL;

    const { brand, body_type, fuel_type, price, year, kms, availability, filter } = router.query
    let urlBrand = brand ? brand.split(',') : brand;
    let urlBodyType = body_type ? body_type.split(',') : body_type;
    let urlFuelType = fuel_type ? fuel_type.split(',') : fuel_type;

    const fetchBrands = useSWR(`${Url}fetch-all-brands`, fetcher);
    const fetchBodyTypes = useSWR(`${Url}fetch-all-body-type`, fetcher);
    const fetchFuelTypes = useSWR(`${Url}fetch-all-fuel-type`, fetcher);

    let productData = [];
    const PAGE_SIZE = 6;
    const { data: createFlatArray, mutate, size, setSize, isValidating, isLoading, error } = useSWRInfinite((index) => {
        const aofs = parseInt(index) + parseInt(1);

        return `${Url}buy-products/?` + '&page=' + aofs;
        // return `${Url}get-product-after-no-data-found` + '&page=' + aofs;
    }
        , fetcher);


    fetchBrands !== undefined && fetchBrands.data !== undefined && fetchBrands.data.brands.map((brand) => {
        brand.isChecked = false
        if (urlBrand !== undefined) {
            const getChecked = urlBrand.filter((check) => {
                if (check === brand.slug) {
                    return brand.isChecked = true
                }
            });
        }
        return brand;
    });

    fetchBodyTypes !== undefined && fetchBodyTypes.data !== undefined && fetchBodyTypes.data.body_type.map((bodyT) => {
        bodyT.isChecked = false;
        if (urlBodyType !== undefined) {
            urlBodyType.map((check) => {
                if (check === bodyT.body_slug) {
                    return bodyT.isChecked = true;
                }
            });
        }
        return bodyT;
    });

    fetchFuelTypes !== undefined && fetchFuelTypes.data !== undefined && fetchFuelTypes.data.fuel_type.map((fuelT) => {
        fuelT.isChecked = false;
        if (urlFuelType !== undefined) {
            urlFuelType.map((check) => {
                if (check === fuelT.fuel_slug) {
                    return fuelT.isChecked = true;
                }
            });
        }
    });




    if (error) return <Loader loaderTitle={`Something went wrong.`} />;
    if (!createFlatArray) return <Loader loaderTitle={`Loading...`} />;

    const returnFlattenObject = (arr) => {
        const flatObject = {};
        for (let i = 0; i < arr.length; i++) {
            for (const property in arr[i]) {
                flatObject[`${property}`] = arr[i][property];
                // setPagevalue(i);
            }
        };
        return flatObject;
    }
    const data = returnFlattenObject(createFlatArray);



    productData = [].concat.apply([], createFlatArray.map(x => x.products))
    // const isReached = productData && productData[productData - 1]?.length < 6;
    const isReached = productData && productData.length === data.productCount;
    const loadingMore = productData && typeof productData[size - 1] === "undefined";


    const isLoadingMore = isLoading || (size > 0 && productData && typeof productData[size - 1] === "undefined");
    const isEmpty = productData?.[0]?.length === 0;
    return (
        <>
            <InfiniteScroll next={() => setSize(size + parseInt(1))} loader={<h6>Loading</h6>} endMessage={''} dataLength={data !== undefined ? productData.length : 0} hasMore={!isReached}>
                <div className="commonm-gap">

                    <ul>
                        {
                            productData !== undefined && productData.map((product, i) => {
                                return (<>
                                    <ProductList key={product._id} product={product} productBanner={data.productBanner !== undefined && data.productBanner !== '' ? data.productBanner : ''} i={i} productCount={data.productCount} fetchBrands={fetchBrands} fetchBodyTypes={fetchBodyTypes} fetchFuelTypes={fetchFuelTypes} />
                                </>

                                )
                            })
                        }
                    </ul>
                </div>
            </InfiniteScroll>
        </>
    )
}

export default NoDataProduct