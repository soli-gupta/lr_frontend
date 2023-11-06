import { numberFormatter } from "@/components/Helper";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from 'swr';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';



const fetcher = (url) => axios.get(url).then(res => res.data);




function CompareProducts({ compareProducts, selectProduct, selectFeatureCategory }) {

    const Url = process.env.NEXT_PUBLIC_URL;


    const [brandModlesListTwo, setBrandModelsListTwo] = useState([]);
    const [brandModlesListThree, setBrandModelsListThree] = useState([]);

    const [Compare, setCompare] = useState(false);

    const [productOne, setProductOne] = useState([]);
    const [productTwo, setProductTwo] = useState([]);

    const [ProductOneFeatureCat, setProductOneFeatureCat] = useState('');

    const [SelectBrandTwo, setSelectBrandTwo] = useState(false);

    const [brandNameTwo, setBrandNameTwo] = useState('');
    const [modelNameTwo, setModelNameTwo] = useState('');

    const [SelectModelTwo, setSelectModelTwo] = useState(false);
    const [SelectCarTwo, setSelectCarTwo] = useState(false);
    const [productsTwo, setProductsTwo] = useState([]);
    const [showProductTwo, setShowProductTwo] = useState('');

    const [ProductTwoFeatureCat, setProductTwoFeatureCat] = useState('');


    const [featureCategories, setFeatureCategories] = useState([]);

    const [tinyLoader, setTinyLoader] = useState(false);

    const showBrandTwo = () => {
        setSelectBrandTwo(!SelectBrandTwo);
        setSelectModelTwo(false);
        setSelectCarTwo(false);
    }

    const showModelTwo = () => {
        setSelectModelTwo(!SelectModelTwo);
        setSelectBrandTwo(false);
        setSelectCarTwo(false);
    }

    const showCarTwo = () => {
        setSelectCarTwo(!SelectCarTwo);
        setSelectBrandTwo(false);
    }

    const fetchBrands = useSWR(`${Url}fetch-allbrand-by-product`, fetcher);

    const getAllFeaturesAndCategories = async () => {
        axios.get(`${Url}fetch-feature-category-by-product`).then((res) => {
            // console.log(res.data.feature_category);
            setFeatureCategories(res.data.feature_category);
        }).catch((e) => {

        });
    }

    useEffect(() => {
        getAllFeaturesAndCategories();
    }, [])

    const fetchModelsByBrandTwo = async (brandSlug, brand_name) => {
        setBrandNameTwo(brand_name);
        setModelNameTwo('');
        setBrandModelsListTwo([]);
        // const fetchModels = await axios.get(`${Url}fetch-models-by-brand-buy-page/${brandSlug}`, {
        const fetchModels = await axios.get(`${Url}fetch-all-models-by-brand-in-product/${brandSlug}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((e) => {
            if (e.response && e.response.data.status === 2) {
                alert(e.response.data.message);
            } else if (e.response && e.response.data.status === 0) {
                alert(e.response.data.message);
            }
        })
        // console.log(fetchModels.data);
        showBrandTwo();
        setBrandModelsListTwo(fetchModels);
        showModelTwo();
    }


    const fetchproductsByBrandAndModelTwo = async (modelSlug, model_name) => {
        setModelNameTwo(model_name);

        const fetchProducts = await axios.get(`${Url}fetch-products-by-brand-model?model_slug=${modelSlug}`, fetcher).catch((e) => {
            if (e && e.response.data.status === 0) {
                alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                alert(`${e.response.data.message}`);
            }
        })
        setProductsTwo(fetchProducts);
        showModelTwo();
        showCarTwo();
    }

    const fetchProductDetailTwo = async (productSlug) => {

        // const { data, error } = useSWR(`${Url}fetch-product-detail-by-slug/${productSlug}`, fetcher);
        const fetchShowProduct = await axios.get(`${Url}fetch-product-detail-by-slug/${productSlug}`).catch((e) => {
            if (e && e.response.data.status === 0) {
                alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                alert(`${e.response.data.message}`);
            }
        });
        // console.log(fetchShowProduct.data.featureCategory);
        setShowProductTwo(fetchShowProduct.data.product);
        setProductTwoFeatureCat(fetchShowProduct.data.featureCategory);
        showCarTwo();
        setShowProductThree('');
        setBrandNameThree('');
        setModelNameThree('');
        setProductsThree([]);
        setShowProductThree('');
        setSelectCarThree('');
        setBrandModelsListThree([]);
    }


    // ------------------------------------ Third Product Selection Start ------------------------------- //


    const [SelectBrandThree, setSelectBrandThree] = useState(false);
    const [brandNameThree, setBrandNameThree] = useState('');
    const [modelNameThree, setModelNameThree] = useState('');
    const [SelectModelThree, setSelectModelThree] = useState(false);
    const [SelectCarThree, setSelectCarThree] = useState(false);
    const [productsThree, setProductsThree] = useState([]);
    const [showProductThree, setShowProductThree] = useState('');

    const [ProductThreeFeatureCat, setProductThreeFeatureCat] = useState('');


    const showBrandThree = () => {
        setSelectBrandThree(!SelectBrandThree);
        setSelectModelThree(false);
        setSelectCarThree(false);
        // showModel();
        // showCar();
    }

    const showModelThree = () => {
        setSelectBrandThree(false);
        setSelectModelThree(!SelectModelThree);
        setSelectCarThree(false);
    }

    const showCarThree = () => {
        setSelectBrandThree(false);
        setSelectModelThree(false);
        setSelectCarThree(!SelectCarThree);
        // showModel();
        // showCar();
    }


    // console.log(fetchBrands.data);

    const fetchModelsByBrandThree = async (brandSlug, brand_name) => {
        setBrandNameThree(brand_name);
        setModelNameThree('');
        setBrandModelsListThree([]);
        // const fetchModels = await axios.get(`${Url}fetch-models-by-brand-buy-page/${brandSlug}`, {
        const fetchModels = await axios.get(`${Url}fetch-all-models-by-brand-in-product/${brandSlug}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((e) => {
            if (e.response && e.response.data.status === 2) {
                alert(e.response.data.message);
            } else if (e.response && e.response.data.status === 0) {
                alert(e.response.data.message);
            }
        })
        // console.log(fetchModels.data);
        showBrandThree();
        setBrandModelsListThree(fetchModels);
        showModelThree();
    }


    const fetchproductsByBrandAndModelThree = async (modelSlug, model_name) => {
        setModelNameThree(model_name);

        const fetchProducts = await axios.get(`${Url}fetch-products-by-brand-model?model_slug=${modelSlug}`, fetcher).catch((e) => {
            if (e && e.response.data.status === 0) {
                alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                alert(`${e.response.data.message}`);
            }
        })

        setProductsThree(fetchProducts);
        showModelThree();
        showCarThree();
    }

    const fetchProductDetailThree = async (productSlug) => {

        // const { data, error } = useSWR(`${Url}fetch-product-detail-by-slug/${productSlug}`, fetcher);
        const fetchShowProduct = await axios.get(`${Url}fetch-product-detail-by-slug/${productSlug}`).catch((e) => {
            if (e && e.response.data.status === 0) {
                alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                alert(`${e.response.data.message}`);
            }
        });

        setShowProductThree(fetchShowProduct.data.product);
        setProductThreeFeatureCat(fetchShowProduct.data.featureCategory);
        showCarThree();
    }









    // ------------------------------------ Third Product Selection End ------------------------------- //



    const closeProductTwo = () => {
        setShowProductTwo('');
        // const $checkProductTwo = document.querySelector('input[name=compare_brandTwo]');
        // if ($checkProductTwo.checked = true) {
        // $checkProductTwo.checked = false;
        // }
        // setSelectBrandTwo('');
        // setModelNameTwo('');

        setBrandNameTwo('');
        setModelNameTwo('');
        setProductsTwo([]);
        // setBrandNameThree('');
        // setModelNameThree('');
        // setBrandModelsListThree([]);
    }


    const closeProductThree = () => {
        setShowProductThree('');
        // setBrandNameThree('');
        // setModelNameThree('');
        setBrandNameThree('');
        setModelNameThree('');
        setProductsThree([]);
    }







    //  -------------------------------- PopUp Code and Functions Strat ----------------------------------- //

    const [popUpProductTwo, setPopUpProductTwo] = useState([]);
    const [popUpProductThree, setPopUpProductThree] = useState([]);



    //  ----------------------------- PopUp Product One Strated -------------------------------- //

    const [SelectBrandPopUpOne, setSelectBrandPopUpOne] = useState(false);
    const [brandNamePopUpOne, setBrandNamePopUpOne] = useState('');
    const [modelNamePopUpOne, setModelNamePopUpOne] = useState('');
    const [SelectModelPopUpOne, setSelectModelPopUpOne] = useState(false);
    const [SelectCarPopUpOne, setSelectCarPopUpOne] = useState(false);
    const [fetchProductsPopUpOne, setFetchProductsPopUpOne] = useState([]);
    const [showProductPopUpOne, setShowProductPopUpOne] = useState('');
    const [BrandModelsListPopUpOne, setBrandModelsListPopUpOne] = useState([]);


    const showBrandPopUpOne = () => {
        setSelectBrandPopUpOne(!SelectBrandPopUpOne);
        setSelectModelPopUpOne(false);
        setSelectCarPopUpOne(false);
        // showModel();
        // showCar();
    }

    const showModelPopUpOne = () => {
        setSelectBrandPopUpOne(false);
        setSelectModelPopUpOne(!SelectModelPopUpOne);
        setSelectCarPopUpOne(false);
    }

    const showCarPopUpOne = () => {
        setSelectBrandPopUpOne(false);
        setSelectModelPopUpOne(false);
        setSelectCarPopUpOne(!SelectCarPopUpOne);
        // showModel();
        // showCar();
    }


    // console.log(fetchBrands.data);

    const fetchModelsByBrandPopUpOne = async (brandSlug, brand_name) => {
        setBrandNamePopUpOne(brand_name);
        setModelNamePopUpOne('');
        // setShowProductPopUpOne(['']);
        // const fetchModels = await axios.get(`${Url}fetch-models-by-brand-buy-page/${brandSlug}`, {
        const fetchModels = await axios.get(`${Url}fetch-all-models-by-brand-in-product/${brandSlug}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((e) => {
            if (e.response && e.response.data.status === 2) {
                alert(e.response.data.message);
            } else if (e.response && e.response.data.status === 0) {
                alert(e.response.data.message);
            }
        })
        // console.log('Popup Product One : ', fetchModels.data);
        showBrandPopUpOne();
        setBrandModelsListPopUpOne(fetchModels);
        showModelPopUpOne();
    }


    const fetchproductsByBrandAndModelPopUpOne = async (modelSlug, model_name) => {
        setModelNamePopUpOne(model_name);

        const fetchProducts = await axios.get(`${Url}fetch-products-by-brand-model?model_slug=${modelSlug}`, fetcher).catch((e) => {
            if (e && e.response.data.status === 0) {
                alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                alert(`${e.response.data.message}`);
            }
        })
        setFetchProductsPopUpOne(fetchProducts);
        showModelPopUpOne();
        setProductOneFeatureCat(fetchProducts.data.featureCategory);
        showCarPopUpOne();
    }

    const fetchProductDetailPopUpOne = async (productSlug) => {

        // const { data, error } = useSWR(`${Url}fetch-product-detail-by-slug/${productSlug}`, fetcher);
        const fetchShowProduct = await axios.get(`${Url}fetch-product-detail-by-slug/${productSlug}`).catch((e) => {
            if (e && e.response.data.status === 0) {
                alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                alert(`${e.response.data.message}`);
            }
        });

        setShowProductPopUpOne(fetchShowProduct.data.product);
        showCarPopUpOne();
    }








    //  ----------------------------- PopUp Product One Endded -------------------------------- //



    //  ----------------------------- PopUp Product Two Strated -------------------------------- //



    const [SelectBrandPopUpTwo, setSelectBrandPopUpTwo] = useState(false);
    const [brandNamePopUpTwo, setBrandNamePopUpTwo] = useState('');
    const [modelNamePopUpTwo, setModelNamePopUpTwo] = useState('');
    const [SelectModelPopUpTwo, setSelectModelPopUpTwo] = useState(false);
    const [SelectCarPopUpTwo, setSelectCarPopUpTwo] = useState(false);
    const [fetchProductsPopUpTwo, setFetchProductsPopUpTwo] = useState([]);
    const [showProductPopUpTwo, setShowProductPopUpTwo] = useState('');
    const [BrandModelsListPopUpTwo, setBrandModelsListPopUpTwo] = useState([]);


    const showBrandPopUpTwo = () => {
        setSelectBrandPopUpTwo(!SelectBrandPopUpTwo);
        setSelectModelPopUpTwo(false);
        setSelectCarPopUpTwo(false);
        // showModel();
        // showCar();
    }

    const showModelPopUpTwo = () => {
        setSelectBrandPopUpTwo(false);
        setSelectModelPopUpTwo(!SelectModelPopUpTwo);
        setSelectCarPopUpTwo(false);
    }

    const showCarPopUpTwo = () => {
        setSelectBrandPopUpTwo(false);
        setSelectModelPopUpTwo(false);
        setSelectCarPopUpTwo(!SelectCarPopUpTwo);
        // showModel();
        // showCar();
    }


    // console.log(fetchBrands.data);

    const fetchModelsByBrandPopUpTwo = async (brandSlug, brand_name) => {
        setBrandNamePopUpTwo(brand_name);
        // const fetchModels = await axios.get(`${Url}fetch-models-by-brand-buy-page/${brandSlug}`, {
        const fetchModels = await axios.get(`${Url}fetch-all-models-by-brand-in-product/${brandSlug}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((e) => {
            if (e.response && e.response.data.status === 2) {
                alert(e.response.data.message);
            } else if (e.response && e.response.data.status === 0) {
                alert(e.response.data.message);
            }
        })
        // console.log('Popup Product One : ', fetchModels.data);
        showBrandPopUpTwo();
        setBrandModelsListPopUpTwo(fetchModels);
        showModelPopUpTwo();
    }


    const fetchproductsByBrandAndModelPopUpTwo = async (modelSlug, model_name) => {
        setModelNamePopUpTwo(model_name);

        const fetchProducts = await axios.get(`${Url}fetch-products-by-brand-model?model_slug=${modelSlug}`, fetcher).catch((e) => {
            if (e && e.response.data.status === 0) {
                alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                alert(`${e.response.data.message}`);
            }
        })

        setFetchProductsPopUpTwo(fetchProducts);
        showModelPopUpTwo();
        showCarPopUpTwo();
    }

    const fetchProductDetailPopUpTwo = async (productSlug) => {
        const fetchShowProduct = await axios.get(`${Url}fetch-product-detail-by-slug/${productSlug}`).catch((e) => {
            if (e && e.response.data.status === 0) {
                alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                alert(`${e.response.data.message}`);
            }
        });

        setShowProductPopUpTwo(fetchShowProduct.data.product);
        showCarPopUpTwo();
    }








    //  ----------------------------- PopUp Product Two Endded -------------------------------- //


    //  ----------------------------- PopUp Product Three Strated -------------------------------- //



    const [SelectBrandPopUpThree, setSelectBrandPopUpThree] = useState(false);
    const [brandNamePopUpThree, setBrandNamePopUpThree] = useState('');
    const [modelNamePopUpThree, setModelNamePopUpThree] = useState('');
    const [SelectModelPopUpThree, setSelectModelPopUpThree] = useState(false);
    const [SelectCarPopUpThree, setSelectCarPopUpThree] = useState(false);
    const [fetchProductsPopUpThree, setFetchProductsPopUpThree] = useState([]);
    const [showProductPopUpThree, setShowProductPopUpThree] = useState('');
    const [BrandModelsListPopUpThree, setBrandModelsListPopUpThree] = useState([]);


    const showBrandPopUpThree = () => {
        setSelectBrandPopUpThree(!SelectBrandPopUpThree);
        setSelectModelPopUpThree(false);
        setSelectCarPopUpThree(false);
        // showModel();
        // showCar();
    }

    const showModelPopUpThree = () => {
        setSelectBrandPopUpThree(false);
        setSelectModelPopUpThree(!SelectModelPopUpThree);
        setSelectCarPopUpThree(false);
    }

    const showCarPopUpThree = () => {
        setSelectBrandPopUpThree(false);
        setSelectModelPopUpThree(false);
        setSelectCarPopUpThree(!SelectCarPopUpThree);
        // showModel();
        // showCar();
    }


    // console.log(fetchBrands.data);

    const fetchModelsByBrandPopUpThree = async (brandSlug, brand_name) => {
        setBrandNamePopUpThree(brand_name);
        // const fetchModels = await axios.get(`${Url}fetch-models-by-brand-buy-page/${brandSlug}`, {
        const fetchModels = await axios.get(`${Url}fetch-all-models-by-brand-in-product/${brandSlug}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((e) => {
            if (e.response && e.response.data.status === 2) {
                alert(e.response.data.message);
            } else if (e.response && e.response.data.status === 0) {
                alert(e.response.data.message);
            }
        })
        showBrandPopUpThree();
        setBrandModelsListPopUpThree(fetchModels);
        showModelPopUpThree();
    }


    const fetchproductsByBrandAndModelPopUpThree = async (modelSlug, model_name) => {
        setModelNamePopUpThree(model_name);

        const fetchProducts = await axios.get(`${Url}fetch-products-by-brand-model?model_slug=${modelSlug}`, fetcher).catch((e) => {
            if (e && e.response.data.status === 0) {
                alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                alert(`${e.response.data.message}`);
            }
        })

        setFetchProductsPopUpThree(fetchProducts);
        showModelPopUpThree();
        showCarPopUpThree();
    }

    const fetchProductDetailPopUpThree = async (productSlug) => {

        // const { data, error } = useSWR(`${Url}fetch-product-detail-by-slug/${productSlug}`, fetcher);
        const fetchShowProduct = await axios.get(`${Url}fetch-product-detail-by-slug/${productSlug}`).catch((e) => {
            if (e && e.response.data.status === 0) {
                alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                alert(`${e.response.data.message}`);
            }
        });
        // console.log(fetchShowProduct.data);
        setShowProductPopUpThree(fetchShowProduct.data.product);
        showCarPopUpThree();
    }








    //  ----------------------------- PopUp Product Three Endded -------------------------------- //



    const [carCompareError, setCarCompareError] = useState('');

    const openCompare = () => {

        if (showProductTwo !== undefined && showProductTwo !== '') {
            setCarCompareError(`Please select another car to compare.`);
            setCompare(true)
            setShowProductPopUpOne(selectProduct);
            setShowProductPopUpTwo(showProductTwo);
            setShowProductPopUpThree(showProductThree);
            setProductOneFeatureCat(selectFeatureCategory);
            if (typeof window !== "undefined") {
                document.body.classList.add('hide-scroll');
            }
            return false;
        }

        document.getElementById('car-compare-error').innerHTML = 'Please select another car to compare.';
        document.getElementById("car-compare-error").style.display = "block";
        setTimeout(() => {
            document.getElementById('car-compare-error').innerHTML = '';
            document.getElementById("car-compare-error").style.display = "none";
            setCarCompareError(``);
        }, 3000);

    }


    const closePop = () => {
        // setIncludebefefits(false)
        // setlocationAdress(false)
        // setLogin(false)
        setShowProductTwo('');
        setShowProductThree('');
        setShowProductPopUpTwo('');
        setShowProductPopUpThree('');

        setFetchProductsPopUpThree([]);
        setFetchProductsPopUpTwo([]);

        setModelNamePopUpTwo('');
        setBrandNamePopUpTwo('');

        setBrandNamePopUpThree('');
        setModelNamePopUpThree('');

        setBrandNameTwo('');
        setModelNameTwo('');

        setBrandNameThree('');
        setModelNameThree('');

        setBrandModelsListPopUpTwo([]);
        setBrandModelsListPopUpThree([]);

        setBrandModelsListTwo([]);
        setBrandModelsListThree([]);


        document.getElementById('car-compare-error').innerHTML = '';
        document.getElementById("car-compare-error").style.display = "none";

        setCompare(false)
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll');
        }
    }

    //  -------------------------------- PopUp Code and Functions End ----------------------------------- //



    const closeProductOnePopup = () => {
        setShowProductPopUpOne('');

        setBrandNamePopUpOne('');
        setModelNamePopUpOne('');
        setFetchProductsPopUpOne([]);
        setBrandModelsListPopUpOne([]);
    }

    const closeProductTwoPopup = () => {
        setShowProductPopUpTwo('');
        console.log('prop two')
        setBrandNamePopUpTwo('');
        setModelNamePopUpTwo('');
        setFetchProductsPopUpTwo([]);
        setBrandModelsListPopUpTwo([]);
    }

    const closeProductThreePopup = () => {
        setShowProductPopUpThree('');

        setBrandNamePopUpThree('');
        setModelNamePopUpThree('');
        setFetchProductsPopUpThree([]);
        setBrandModelsListPopUpThree([]);
    }



    const [productOneFeatures, setProductOneFeatures] = useState([]);
    const [productTwoFeatures, setProductTwoFeatures] = useState([]);
    const [productThreeFeatures, setProductThreeFeatures] = useState([]);
    const [featureByCate, setFeatureByCate] = useState([]);
    // console.log('Product Two : ', ProductTwoFeatureCat);
    // console.log('Product Three : ', ProductThreeFeatureCat);

    // console.log()

    const fetchFeatures = async (cateId, productOneId, productTwoId, productThreeId) => {
        setTinyLoader(true);
        // console.log('cateId : ', cateId);
        // console.log('productOneId : ', productOneId);
        // console.log('productTwoId : ', productTwoId);
        // console.log('productThreeId : ', productThreeId);

        const fetchAllFeatures = await axios.get(`${Url}fetch-allfeature-details-by-category?feature_id=${cateId}`).catch((e) => {
            // console.log(e);
            if (e && e.response.data.status === 0) {
                // alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                // alert(`${e.respopnse.data.message}`);
            }
        });

        const fetchFeaturesOne = await axios.get(`${Url}fetch-product-feature-by-category?cate_id=${cateId}&product_id=${productOneId}`).catch((e) => {
            if (e && e.response.data.status === 0) {
                // alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                // alert(`${e.respopnse.data.message}`);
            }
        });

        const fetchFeaturesTwo = await axios.get(`${Url}fetch-product-feature-by-category?cate_id=${cateId}&product_id=${productTwoId}`).catch((e) => {
            if (e && e.response.data.status === 0) {
                // alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                // alert(`${e.respopnse.data.message}`);
            }
        });

        const fetchFeaturesThree = await axios.get(`${Url}fetch-product-feature-by-category?cate_id=${cateId}&product_id=${productThreeId}`).catch((e) => {
            if (e && e.response.data.status === 0) {
                // alert(`${e.response.data.message}`);
            } else if (e && e.response.data.status === 2) {
                // alert(`${e.respopnse.data.message}`);
            }
        });

        // console.log(fetchAllFeatures.data); 
        {/**
    !== undefined && fetchFeaturesThree.data !== undefined ? fetchFeaturesThree.data : ''
    !== undefined && fetchFeaturesOne.data !== undefined ? fetchFeaturesOne.data : ''
!== undefined && fetchFeaturesTwo.data !== undefined ? fetchFeaturesTwo.data : ''
    */}
        setTinyLoader(false);
        setFeatureByCate(fetchAllFeatures.data);
        // console.log(' Product One : ', fetchFeaturesOne.data.features.length);
        // console.log(' Product Two : ', fetchFeaturesTwo.data.features.length);
        // console.log(' Product Three : ', fetchFeaturesThree.data.features.length);
        setProductOneFeatures(fetchFeaturesOne !== undefined && fetchFeaturesOne.data !== undefined ? fetchFeaturesOne.data : '');
        setProductTwoFeatures(fetchFeaturesTwo !== undefined && fetchFeaturesTwo.data !== undefined ? fetchFeaturesTwo.data : '');
        setProductThreeFeatures(fetchFeaturesThree !== undefined && fetchFeaturesThree.data !== undefined ? fetchFeaturesThree.data : '');
    }



    return (
        <>

            <section className="compareSec comPad">
                <div className="wrapper">
                    <div className="shadowBox">
                        <h2>Compare</h2>
                        <div className="compareItems">
                            <div className="compItem">

                                <div className="proInner">
                                    <Link href={`javascript:void(0)`}> </Link>
                                    <div className="pro-img">
                                        <img src={`${selectProduct.image}`} />
                                    </div>

                                    <div className="pro-name">{selectProduct.name}</div>

                                    <div className="pro-spec">
                                        <div className="spec-item"> <span> Regd. Year</span> {selectProduct.registration_year} </div>
                                        <div className="spec-item"> <span>KMs Driven</span>{selectProduct.kms_driven} </div>
                                        <div className="spec-item"> <span>Fuel Type</span> {selectProduct.fuel_type.fuel_name} </div>
                                    </div>
                                    <div className="price-detail">
                                        <div className="price">INR <span>{numberFormatter(selectProduct.price)}/-</span></div>
                                        {selectProduct.product_emi !== '' && selectProduct.product_emi !== undefined ? <div className="emiStarts">EMI starts from <span>INR {numberFormatter(selectProduct.product_emi)}/-</span> </div> : ''}
                                    </div>
                                </div>


                            </div>

                            <div className="compItem">

                                {
                                    showProductTwo !== undefined && showProductTwo !== '' ?
                                        <div className="proInner">

                                            {/* <Link href={`javascript:void(0)`}> </Link> */}
                                            <div className="closeBtn" onClick={closeProductTwo}></div>

                                            <div className="pro-img">
                                                <img src={`${showProductTwo.image}`} />
                                            </div>

                                            <div className="pro-name">{showProductTwo.name}</div>

                                            <div className="pro-spec">
                                                <div className="spec-item"> <span> Regd. Year</span> {showProductTwo.registration_year} </div>
                                                <div className="spec-item"> <span>KMs Driven</span>{showProductTwo.kms_driven} </div>
                                                <div className="spec-item"> <span>Fuel Type</span> {showProductTwo.fuel_type !== undefined ? showProductTwo.fuel_type.fuel_name : ''} </div>
                                            </div>
                                            <div className="price-detail">
                                                <div className="price">INR <span>{numberFormatter(showProductTwo.price)}/-</span></div>
                                                {showProductTwo.product_emi !== '' && showProductTwo.product_emi !== undefined ? <div className="emiStarts">EMI starts from <span>INR {numberFormatter(showProductTwo.product_emi)}/-</span> </div> : ''}
                                            </div>
                                        </div> :
                                        <div className="car-comp-box" id="comp-select-box">
                                            <div className="car-in">

                                                <div className="selc-bx">
                                                    <div onClick={showBrandTwo} className="selectCarLabel">{brandNameTwo !== '' ? brandNameTwo : 'Select Brand'}</div>
                                                    {
                                                        SelectBrandTwo ?
                                                            <ul className="filterListComan shortByCars scroll-area01 custom-scroller">
                                                                {
                                                                    fetchBrands.data !== undefined && fetchBrands.data.brands.map((brand) => {
                                                                        return (
                                                                            <li key={brand._id}>

                                                                                <input type="radio" id={`compare_brand_${brand.slug}_Two`} name="compare_brandTwo" value={brand.slug} onClick={(e) => fetchModelsByBrandTwo(e.target.value, brand.name)} />
                                                                                <label htmlFor={`compare_brand_${brand.slug}_Two`}>{brand.name}</label>

                                                                            </li>
                                                                        )
                                                                    })
                                                                }

                                                            </ul>
                                                            : ""}

                                                </div>
                                                <div className="selc-bx">
                                                    <div className="selectCarLabel" onClick={showModelTwo}>{modelNameTwo ? modelNameTwo : 'Select Model'}</div>

                                                    {
                                                        SelectModelTwo ?
                                                            <ul className="filterListComan shortByCars scroll-area01 custom-scroller">
                                                                {
                                                                    brandModlesListTwo && brandModlesListTwo.data !== undefined && brandModlesListTwo.data.brand_models.map((model) => {
                                                                        return (
                                                                            <li key={model._id}>
                                                                                <input type="radio" id={`compare_model_${model.slug}_Two`} name="compare_modelTwo" onClick={(e) => fetchproductsByBrandAndModelTwo(e.target.value, model.name)} value={model.slug} />
                                                                                <label htmlFor={`compare_model_${model.slug}_Two`}>{model.name}</label>

                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                            : ""}


                                                </div>
                                                <div className="selc-bx">
                                                    <div className="selectCarLabel" onClick={showCarTwo}>Select Car</div>
                                                    {
                                                        SelectCarTwo ?

                                                            <div className={`selectCarDropDwn `} >
                                                                <div className="scroll-area01 mCustomScrollbar custom-scroller">
                                                                    {
                                                                        productsTwo.data !== undefined && productsTwo.data.products.map((product) => {
                                                                            return (
                                                                                <div className="item" key={product.slug} onClick={(e) => fetchProductDetailTwo(product.slug)} >
                                                                                    <div className="img"><img src={`${product.image}`} /></div>
                                                                                    <div className="itemCont">
                                                                                        <h3>{product.name}</h3>
                                                                                        <div className="pro-spec">
                                                                                            <div className="spec-item"> <span>Year</span> {product.registration_year} </div>
                                                                                            <div className="spec-item"> <span>KMs Driven</span>{product.kms_driven} </div>
                                                                                            <div className="spec-item"> <span>Fuel Type</span> {product.fuel_type.fuel_name} </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                            : ""}

                                                </div>
                                            </div>


                                        </div>
                                }
                            </div>

                            <div className="compItem">


                                {
                                    showProductTwo && showProductThree !== undefined && showProductThree !== '' ?
                                        <div className="proInner">

                                            {/* <Link href={"javascript:void(0)"}> </Link> */}
                                            <div className="closeBtn" onClick={closeProductThree}></div>
                                            <div className="pro-img">
                                                <img src={`${showProductThree.image}`} />
                                            </div>

                                            <div className="pro-name">{showProductThree.name}</div>

                                            <div className="pro-spec">
                                                <div className="spec-item"> <span> Regd. Year</span> {showProductThree.registration_year} </div>
                                                <div className="spec-item"> <span>KMs Driven</span>{showProductThree.kms_driven} </div>
                                                <div className="spec-item"> <span>Fuel Type</span> {showProductThree.fuel_type !== undefined ? showProductThree.fuel_type.fuel_name : ''} </div>
                                            </div>
                                            <div className="price-detail">
                                                <div className="price">INR <span>{numberFormatter(showProductThree.price)}/-</span></div>
                                                {showProductThree.product_emi !== '' && showProductThree.product_emi !== undefined ? <div className="emiStarts">EMI starts from <span>INR {numberFormatter(showProductThree.product_emi)}/-</span> </div> : ''}
                                            </div>
                                        </div> :
                                        <div className="car-comp-box" id="comp-select-box">
                                            <div className="car-in">
                                                <div className="selc-bx">
                                                    <div onClick={showBrandThree} className="selectCarLabel">{brandNameThree !== '' ? brandNameThree : 'Select Brand'}</div>
                                                    {
                                                        SelectBrandThree ?
                                                            <ul className="filterListComan shortByCars scroll-area01 custom-scroller">
                                                                {
                                                                    fetchBrands.data !== undefined && fetchBrands.data.brands.map((brand) => {
                                                                        return (
                                                                            <li key={brand._id}>

                                                                                <input type="radio" id={`compare_brand_${brand.slug}_Three`} name="compare_brandThree" value={brand.slug} onClick={(e) => fetchModelsByBrandThree(e.target.value, brand.name)} />
                                                                                <label htmlFor={`compare_brand_${brand.slug}_Three`}>{brand.name}</label>

                                                                            </li>
                                                                        )
                                                                    })
                                                                }

                                                            </ul>
                                                            : ""}

                                                </div>
                                                <div className="selc-bx">
                                                    <div className="selectCarLabel" onClick={showModelThree}>{modelNameThree ? modelNameThree : 'Select Model'}</div>

                                                    {
                                                        SelectModelThree ?
                                                            <ul className="filterListComan shortByCars scroll-area01 custom-scroller">
                                                                {
                                                                    brandModlesListThree.data !== undefined && brandModlesListThree.data.brand_models.map((model) => {
                                                                        return (
                                                                            <li key={model._id}>
                                                                                <input type="radio" id={`compare_model_${model.slug}_Three`} name="compare_model" onClick={(e) => fetchproductsByBrandAndModelThree(e.target.value, model.name)} value={model.slug} />
                                                                                <label htmlFor={`compare_model_${model.slug}_Three`}>{model.name}</label>

                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                            : ""}

                                                </div>
                                                <div className="selc-bx">
                                                    <div className="selectCarLabel" onClick={showCarThree}>Select Car</div>
                                                    {
                                                        SelectCarThree ?

                                                            <div className={`selectCarDropDwn `} >
                                                                <div className="scroll-area01 mCustomScrollbar custom-scroller">

                                                                    {
                                                                        productsThree.data !== undefined && productsThree.data.products.map((product) => {
                                                                            return (

                                                                                <div className="item" key={product.slug} onClick={(e) => fetchProductDetailThree(product.slug)} >
                                                                                    <div className="img"><img src={`${product.image}`} /></div>
                                                                                    <div className="itemCont">
                                                                                        <h3>{product.name}</h3>
                                                                                        <div className="pro-spec">
                                                                                            <div className="spec-item"> <span>Year</span> {product.registration_year} </div>
                                                                                            <div className="spec-item"> <span>KMs Driven</span>{product.kms_driven} </div>
                                                                                            <div className="spec-item"> <span>Fuel Type</span> {product.fuel_type.fuel_name} </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                            : ""}
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>



                        </div>


                        <small className="error" id="car-compare-error">{carCompareError}</small>
                        <button onClick={openCompare} className="btn comparePopupBtn reverse">Compare</button>

                    </div>
                </div>
            </section>




            {Compare ?
                <div className="overlay-new comparePopup">

                    <div className="rotate-container">

                        <div onClick={closePop} className="close inside-rotate"></div>
                        <div className="inner-container">
                            <div className="phone">
                                <div className="phone-dot"></div>
                            </div>
                            <div className="message">
                                Please rotate your device
                            </div>
                        </div>
                    </div>
                    <div className="overlay-w">

                        <section className="comparePopup comPad">
                            <div className="wrapper">
                                <div onClick={closePop} className="close"></div>
                                <h2 className="h2">Compare</h2>
                                <div className="compareBg">
                                    {/* <div className="compItem">
										<div className="slct-option">
											<ul className="globalInp">
												<li>
													<input type="checkbox" id="check1" name="Audi" value=" " />
													<label htmlFor="check1"> <span></span>HIDE COMMON FEATURES</label>
												</li>
												<li>
													<input type="checkbox" id="check2" name="Porsche" value=" " />
													<label htmlFor="check2"> <span></span>HIGHLIGHTS DIFFERENCES</label>
												</li>
											</ul>
										</div>
									</div> */}





                                    <div className="compItem">


                                        {
                                            showProductPopUpOne !== undefined && showProductPopUpOne !== '' ? <>
                                                {/* <div className="closeBtn" onClick={closeProductOnePopup}></div> */}
                                                <div className="pro-img">
                                                    <Link href={`javascript:void(0)`}><img src={`${showProductPopUpOne.image}`} /> </Link>
                                                </div>
                                                <Link href={`javascript:void(0)`}>
                                                    <div className="pro-name">{showProductPopUpOne.name}</div>
                                                </Link>
                                                <div className="price-detail">
                                                    <div className="price">INR <span>{numberFormatter(showProductPopUpOne.price)}/-</span></div>
                                                </div>
                                                <ul className="listing">
                                                    <li>{showProductPopUpOne.registration_year}</li>
                                                    <li>{showProductPopUpOne.registration_state}</li>
                                                    <li>{showProductPopUpOne.kms_driven}</li>
                                                    <li>{showProductPopUpOne.product_ownership}</li>
                                                    <li>{showProductPopUpOne.fuel_type !== undefined ? showProductPopUpOne.fuel_type.fuel_name : ''}</li>
                                                </ul>
                                            </> : <>
                                                <div className="car-comp-box" id="comp-select-box">
                                                    <div className="car-in">
                                                        <div className="selc-bx">
                                                            <div onClick={showBrandPopUpOne} className="selectCarLabel">{brandNamePopUpOne !== '' ? brandNamePopUpOne : 'Select Brand'}</div>
                                                            {
                                                                SelectBrandPopUpOne ?
                                                                    <ul className="filterListComan shortByCars scroll-area01 custom-scroller">
                                                                        {
                                                                            fetchBrands.data !== undefined && fetchBrands.data.brands.map((brand) => {
                                                                                return (
                                                                                    <li key={brand._id}>

                                                                                        <input type="radio" id={`compare_brand_${brand.slug}_PopUpOne`} name="compare_brandPopUpOne" value={brand.slug} onClick={(e) => fetchModelsByBrandPopUpOne(e.target.value, brand.name)} />
                                                                                        <label htmlFor={`compare_brand_${brand.slug}_PopUpOne`}>{brand.name}</label>

                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }

                                                                    </ul>
                                                                    : ""}

                                                        </div>
                                                        <div className="selc-bx">
                                                            <div className="selectCarLabel" onClick={showModelPopUpOne}>{modelNamePopUpOne ? modelNamePopUpOne : 'Select Model'}</div>

                                                            {
                                                                SelectModelPopUpOne ?
                                                                    <ul className="filterListComan shortByCars scroll-area01 custom-scroller">
                                                                        {
                                                                            BrandModelsListPopUpOne.data !== undefined && BrandModelsListPopUpOne.data.brand_models.map((model) => {
                                                                                return (
                                                                                    <li key={model._id}>
                                                                                        <input type="radio" id={`compare_model_${model.slug}_PopUpOne`} name="compare_model" onClick={(e) => fetchproductsByBrandAndModelPopUpOne(e.target.value, model.name)} value={model.slug} />
                                                                                        <label htmlFor={`compare_model_${model.slug}_PopUpOne`}>{model.name}</label>

                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                    : ""}

                                                        </div>
                                                        <div className="selc-bx">
                                                            <div className="selectCarLabel" onClick={showCarPopUpOne}>Select Car</div>
                                                            {
                                                                SelectCarPopUpOne ?

                                                                    <div className={`selectCarDropDwn `} >
                                                                        <div className="scroll-area01 mCustomScrollbar custom-scroller">

                                                                            {
                                                                                fetchProductsPopUpOne.data !== undefined && fetchProductsPopUpOne.data.products.map((product) => {
                                                                                    return (

                                                                                        <div className="item" key={product.slug} onClick={(e) => fetchProductDetailPopUpOne(product.slug)} >
                                                                                            <div className="img"><img src={`${product.image}`} /></div>
                                                                                            <div className="itemCont">
                                                                                                <h3>{product.name}</h3>
                                                                                                <div className="pro-spec">
                                                                                                    <div className="spec-item"> <span>Year</span> {product.registration_year} </div>
                                                                                                    <div className="spec-item"> <span>KMs Driven</span>{product.kms_driven} </div>
                                                                                                    <div className="spec-item"> <span>Fuel Type</span> {product.fuel_type.fuel_name} </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    : ""}

                                                        </div>     {/*  */}
                                                    </div>
                                                </div>
                                            </>
                                        }



                                    </div>



                                    <div className="compItem">


                                        {
                                            showProductPopUpTwo !== undefined && showProductPopUpTwo !== '' ? <>
                                                <div className="closeBtn" onClick={closeProductTwoPopup}></div>
                                                <div className="pro-img">
                                                    <Link href={`javascript:void(0)`}><img src={`${showProductPopUpTwo.image}`} /> </Link>
                                                </div>
                                                <Link href={`javascript:void(0)`}>
                                                    <div className="pro-name">{showProductPopUpTwo.name}</div>
                                                </Link>
                                                <div className="price-detail">
                                                    <div className="price">INR <span>{numberFormatter(showProductPopUpTwo.price)}/-</span></div>
                                                </div>
                                                <ul className="listing">
                                                    <li>{showProductPopUpTwo.registration_year}</li>
                                                    <li>{showProductPopUpTwo.registration_state}</li>
                                                    <li>{showProductPopUpTwo.kms_driven}</li>
                                                    <li>{showProductPopUpTwo.product_ownership}</li>
                                                    <li>{showProductPopUpTwo.fuel_type !== undefined ? showProductPopUpTwo.fuel_type.fuel_name : ''}</li>
                                                </ul>
                                            </> : <>
                                                <div className="car-comp-box" id="comp-select-box">
                                                    <div className="car-in">
                                                        <div className="selc-bx">
                                                            <div onClick={showBrandPopUpTwo} className="selectCarLabel">{brandNamePopUpTwo !== '' ? brandNamePopUpTwo : 'Select Brand'}</div>
                                                            {
                                                                SelectBrandPopUpTwo ?
                                                                    <ul className="filterListComan shortByCars scroll-area01 custom-scroller">
                                                                        {
                                                                            fetchBrands.data !== undefined && fetchBrands.data.brands.map((brand) => {
                                                                                return (
                                                                                    <li key={brand._id}>

                                                                                        <input type="radio" id={`compare_brand_${brand.slug}_PopUpTwo`} name="compare_brandPopUpTwo" value={brand.slug} onClick={(e) => fetchModelsByBrandPopUpTwo(e.target.value, brand.name)} />
                                                                                        <label htmlFor={`compare_brand_${brand.slug}_PopUpTwo`}>{brand.name}</label>

                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }

                                                                    </ul>
                                                                    : ""}

                                                        </div>
                                                        <div className="selc-bx">
                                                            <div className="selectCarLabel" onClick={showModelPopUpTwo}>{modelNamePopUpTwo ? modelNamePopUpTwo : 'Select Model'}</div>

                                                            {
                                                                SelectModelPopUpTwo ?
                                                                    <ul className="filterListComan shortByCars scroll-area01 custom-scroller">
                                                                        {
                                                                            BrandModelsListPopUpTwo.data !== undefined && BrandModelsListPopUpTwo.data.brand_models.map((model) => {
                                                                                return (
                                                                                    <li key={model._id}>
                                                                                        <input type="radio" id={`compare_model_${model.slug}_PopUpTwo`} name="compare_model" onClick={(e) => fetchproductsByBrandAndModelPopUpTwo(e.target.value, model.name)} value={model.slug} />
                                                                                        <label htmlFor={`compare_model_${model.slug}_PopUpTwo`}>{model.name}</label>

                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                    : ""}

                                                        </div>
                                                        <div className="selc-bx">
                                                            <div className="selectCarLabel" onClick={showCarPopUpTwo}>Select Car</div>
                                                            {
                                                                SelectCarPopUpTwo ?

                                                                    <div className={`selectCarDropDwn `} >
                                                                        <div className="scroll-area01 mCustomScrollbar custom-scroller">

                                                                            {
                                                                                fetchProductsPopUpTwo.data !== undefined && fetchProductsPopUpTwo.data.products.map((product) => {
                                                                                    return (

                                                                                        <div className="item" key={product.slug} onClick={(e) => fetchProductDetailPopUpTwo(product.slug)} >
                                                                                            <div className="img"><img src={`${product.image}`} /></div>
                                                                                            <div className="itemCont">
                                                                                                <h3>{product.name}</h3>
                                                                                                <div className="pro-spec">
                                                                                                    <div className="spec-item"> <span>Year</span> {product.registration_year} </div>
                                                                                                    <div className="spec-item"> <span>KMs Driven</span>{product.kms_driven} </div>
                                                                                                    <div className="spec-item"> <span>Fuel Type</span> {product.fuel_type.fuel_name} </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    : ""}

                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        }



                                    </div>


                                    <div className="compItem">


                                        {
                                            showProductPopUpThree !== undefined && showProductPopUpThree !== '' ? <>
                                                <div className="closeBtn" onClick={closeProductThreePopup}></div>
                                                <div className="pro-img">
                                                    <Link href={`javascript:void(0)`}><img src={`${showProductPopUpThree.image}`} /> </Link>
                                                </div>
                                                <Link href={`javascript:void(0)`}>
                                                    <div className="pro-name">{showProductPopUpThree.name}</div>
                                                </Link>
                                                <div className="price-detail">
                                                    <div className="price">INR <span>{numberFormatter(showProductPopUpThree.price)}/-</span></div>
                                                </div>
                                                <ul className="listing">
                                                    <li>{showProductPopUpThree.registration_year}</li>
                                                    <li>{showProductPopUpThree.registration_state}</li>
                                                    <li>{showProductPopUpThree.kms_driven}</li>
                                                    <li>{showProductPopUpThree.product_ownership}</li>
                                                    <li>{showProductPopUpThree.fuel_type !== undefined ? showProductPopUpThree.fuel_type.fuel_name : ''}</li>
                                                </ul>
                                            </> : <>
                                                <div className="car-comp-box" id="comp-select-box">
                                                    <div className="car-in">
                                                        <div className="selc-bx">
                                                            <div onClick={showBrandPopUpThree} className="selectCarLabel">{brandNamePopUpThree !== '' ? brandNamePopUpThree : 'Select Brand'}</div>
                                                            {
                                                                SelectBrandPopUpThree ?
                                                                    <ul className="filterListComan shortByCars scroll-area01 custom-scroller">
                                                                        {
                                                                            fetchBrands.data !== undefined && fetchBrands.data.brands.map((brand) => {
                                                                                return (
                                                                                    <li key={brand._id}>

                                                                                        <input type="radio" id={`compare_brand_${brand.slug}_PopUpThree`} name="compare_brandPopUpThree" value={brand.slug} onClick={(e) => fetchModelsByBrandPopUpThree(e.target.value, brand.name)} />
                                                                                        <label htmlFor={`compare_brand_${brand.slug}_PopUpThree`}>{brand.name}</label>

                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }

                                                                    </ul>
                                                                    : ""}

                                                        </div>
                                                        <div className="selc-bx">
                                                            <div className="selectCarLabel" onClick={showModelPopUpThree}>{modelNamePopUpThree ? modelNamePopUpThree : 'Select Model'}</div>

                                                            {
                                                                SelectModelPopUpThree ?
                                                                    <ul className="filterListComan shortByCars scroll-area01 custom-scroller">
                                                                        {
                                                                            BrandModelsListPopUpThree.data !== undefined && BrandModelsListPopUpThree.data.brand_models.map((model) => {
                                                                                return (
                                                                                    <li key={model._id}>
                                                                                        <input type="radio" id={`compare_model_${model.slug}_PopUpThree`} name="compare_model" onClick={(e) => fetchproductsByBrandAndModelPopUpThree(e.target.value, model.name)} value={model.slug} />
                                                                                        <label htmlFor={`compare_model_${model.slug}_PopUpThree`}>{model.name}</label>

                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                    : ""}

                                                        </div>
                                                        <div className="selc-bx">
                                                            <div className="selectCarLabel" onClick={showCarPopUpThree}>Select Car</div>
                                                            {
                                                                SelectCarPopUpThree ?

                                                                    <div className={`selectCarDropDwn `} >
                                                                        <div className="scroll-area01 mCustomScrollbar custom-scroller">

                                                                            {
                                                                                fetchProductsPopUpThree.data !== undefined && fetchProductsPopUpThree.data.products.map((product) => {
                                                                                    return (

                                                                                        <div className="item" key={product.slug} onClick={(e) => fetchProductDetailPopUpThree(product.slug)} >
                                                                                            <div className="img"><img src={`${product.image}`} /></div>
                                                                                            <div className="itemCont">
                                                                                                <h3>{product.name}</h3>
                                                                                                <div className="pro-spec">
                                                                                                    <div className="spec-item"> <span>Year</span> {product.registration_year} </div>
                                                                                                    <div className="spec-item"> <span>KMs Driven</span>{product.kms_driven} </div>
                                                                                                    <div className="spec-item"> <span>Fuel Type</span> {product.fuel_type.fuel_name} </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    : ""}

                                                        </div>     {/*  */}
                                                    </div>
                                                </div>
                                            </>
                                        }



                                    </div>


                                </div>
                                <div className="compreSpec comPad">
                                    <div className="accordion compAccordion">

                                        <Accordion allowZeroExpanded>


                                            {
                                                featureCategories !== undefined && featureCategories !== '' && featureCategories.map((cate, i) => {
                                                    return (
                                                        <>        <AccordionItem>
                                                            <AccordionItemHeading className="accordion-item" key={cate.cate_id} onClick={(e) => fetchFeatures(cate.cate_id, showProductPopUpOne._id, showProductPopUpTwo._id, showProductPopUpThree._id)}>
                                                                <AccordionItemButton className='acrd-title'>
                                                                    {cate.cate_name}
                                                                </AccordionItemButton>
                                                            </AccordionItemHeading>

                                                            {
                                                                featureByCate !== undefined && featureByCate.features !== undefined && featureByCate.features.map((featu) => {
                                                                    return (

                                                                        <AccordionItemPanel key={featu._id}>


                                                                            <table className="table table-bordered">
                                                                                <tbody>

                                                                                    <tr>
                                                                                        <td>{featu.feature_name}</td>
                                                                                        {/**   Product One Spec   */}
                                                                                        {
                                                                                            productOneFeatures !== undefined && productOneFeatures.features !== undefined && productOneFeatures.features.length > 0 ? <>
                                                                                                {
                                                                                                    productOneFeatures.features.map((fetVal) => {

                                                                                                        return (
                                                                                                            <>
                                                                                                                {fetVal.fs_id._id === featu._id ? <td>{fetVal.fs_value}</td> : ''}
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </> : <td>-</td>
                                                                                        }


                                                                                        {/**   Product Two Spec   */}

                                                                                        {
                                                                                            productTwoFeatures !== undefined && productTwoFeatures !== '' && productTwoFeatures.features !== undefined && productTwoFeatures.features.length > 0 ? <>
                                                                                                {
                                                                                                    productTwoFeatures.features.map((fetVal) => {

                                                                                                        return (
                                                                                                            <>
                                                                                                                {fetVal.fs_id._id === featu._id ? <td key={fetVal._id}>{fetVal.fs_value}</td> : ''}
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </> : <td>-</td>
                                                                                        }


                                                                                        {/**   Product Three Spec   */}

                                                                                        {
                                                                                            productThreeFeatures !== '' && productThreeFeatures !== undefined && productThreeFeatures.features !== undefined && productThreeFeatures.features.length > 0 ? <>
                                                                                                {
                                                                                                    productThreeFeatures.features.map((fetVal) => {

                                                                                                        return (
                                                                                                            <>
                                                                                                                {fetVal.fs_id._id === featu._id ? <td key={fetVal._id}>{fetVal.fs_value}</td> : ''}
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </> : <td>-</td>
                                                                                        }
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </AccordionItemPanel>

                                                                    )
                                                                })
                                                            }
                                                        </AccordionItem>
                                                        </>
                                                    )
                                                })
                                            }
                                        </Accordion>




                                    </div>
                                </div>
                            </div>
                        </section>

                    </div></div>
                : ""
            }






        </>
    )
}


export default CompareProducts