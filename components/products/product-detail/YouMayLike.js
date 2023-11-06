
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Link from "next/link";
import { numberFormatter } from "@/components/Helper";


function YouMayLike({ pagination, products, Url }) {



    const settings = {

        slidesPerView: 1,
        spaceBetween: 40,
        navigation: false,
        modules: [Pagination],
        breakpoints: {
            1200: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25,
            },
        }
    };


    // console.log(products);
    return (
        <>
            <section className="comPadBt50 youLikeSlider product-listing">
                <div className="wrapper">
                    <h2>You May Also Like</h2>
                    <Swiper className='threeSlider' {...settings} pagination={{ clickable: true }}>
                        {
                            products !== '' && products !== undefined && products.products.map((product) => {
                                return (
                                    <SwiperSlide key={product.slug}>
                                        <div className="item">
                                            <div className="proInner">
                                                <Link href={`/buy/product-detail/${product.slug}`}></Link>
                                                {product.image_360 && product.image_360 === '1' ? <div className="threSixtyIcon"></div> : ''}
                                                <div className="pro-img">
                                                    <img src={`${product.image}`} />
                                                </div>

                                                <div className="pro-name">{product.name}</div>

                                                <div className="pro-spec">
                                                    <div className="spec-item"> <span> Regd. Year</span> {product.registration_year} </div>
                                                    <div className="spec-item"> <span>KMs Driven</span>{numberFormatter(product.kms_driven)} </div>
                                                    <div className="spec-item"> <span>Fuel Type</span> {product.fuel_type !== undefined ? product.fuel_type.fuel_name : ''} </div>
                                                </div>
                                                <div className="price-detail">
                                                    <div className="price">INR <span>{numberFormatter(product.price)}/-</span></div>
                                                    {product.product_emi !== '' && product.product_emi !== undefined ? <div className="emiStarts">EMI starts from <span>INR {numberFormatter(product.product_emi)}/-</span> </div> : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </section>
        </>
    )
}

export default YouMayLike;