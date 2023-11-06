import React, { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import { $, jquery } from 'react-jquery-plugin'
import Lottie from "lottie-react";
import EmptyCar from "@/public/lotie-icons/emptyData.json";
import WebHead from '@/components/common/WebHead';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import useSWR from 'swr';
import LoginForm from '@/components/LoginForm';
import { ButtonSpinner } from '@/components/Helper';

const fetcher = (url) => axios.get(url).then(res => res.data);
export default function ServiceDetails() {

    const router = useRouter()
    const id = router.query
    const [categoryId, setCategoryId] = useState(id != undefined && id.id ? id.id : '')

    const [allCategory, setAllCategory] = useState('')
    const Fuel = useSWR(`${process.env.NEXT_PUBLIC_URL}get-all-fuels`, fetcher);

    const [openSuccessPopup, setOpenSuccessPopup] = useState(false)
    const [callSuccessMessage, setCallSuccessMessage] = useState('');
    const [callErrorMessage, setCallErrorMessage] = useState('');
    const [Login, setLogin] = useState(false);
    const [tinyLoader, setTinyLoader] = useState(false)
    const [insertId, setInsertId] = useState('')

    const [divBrand, setDivBrand] = useState(true)
    const [divModel, setDivModel] = useState(false)
    const [divVariant, setDivVariant] = useState(false)
    const [divFuel, setDivFuel] = useState(false)
    const [divEdit, setDivEdit] = useState(false)

    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [variant, setVariant] = useState('')

    const [brandName, setBrandName] = useState('')
    const [modelName, setModelName] = useState('')
    const [variantName, setVariantName] = useState('')
    const [fuelName, setFuelName] = useState('')

    const [brandId, setBrandId] = useState('')
    const [modelId, setModelId] = useState('')
    const [variantId, setVariantId] = useState('')

    const [demoId, setDemoId] = useState(id && id.id)


    const [allService, setAllService] = useState('')
    const [selectedServices, setSelectedServices] = useState([])
    const [selectedServiceId, setSelectedServiceId] = useState('')
    const [orderId, setOrderId] = useState('')

    const [disabledBookBtn, setDisabledBookBtn] = useState(true)
    const [shortSummaryDiv, setShortSummaryDiv] = useState(true)
    const [orderSummaryDiv, setOrderSummaryDiv] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(id != undefined && id.index ? id.index : typeof window !== "undefined" ? localStorage.getItem("IndexId") : false)
    const [activeSlide, setActiveSlide] = useState(currentSlide)

    const [carDetailData, setCarDetailData] = useState('')
    const [carDetailDataValue, setCarDetailDataValue] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [gst, setGst] = useState(0)
    const [grandPrice, setGrandPrice] = useState(0)

    const [serviceSelectedId, setServiceSelectedId] = useState([])


    const fetchServiceByCarDetail = async (categoryId, brandName, modelName, variantName, fuelName) => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}user/get-service-by-car-detail?id=${categoryId}&brandId=${brandName}&modelId=${modelName}&variantId=${variantName}&fuel=${fuelName}`)
            .then(function (res) {
                if (res.data.status == 1) {
                    // console.log(res.data.datas)
                    setAllService('');
                    setAllService(res.data.datas)
                }
                //  else if (res.data.status == 0) { 

                // }
            })
            .catch(function (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.status === 0) {
                    alert(error.response.data.message);
                }
            });
        setTimeout(() => {
            if (typeof window !== "undefined") {
                var numToShow = 1;
                $(".list li").hide();
                $('.points-service-pack ul').each(function () {
                    var list = $(this).children("li");
                    var button = $(this).siblings(".next-btn");
                    var less = $(this).siblings('.less-btn');
                    var numInList = list.length;
                    if (numInList > numToShow) {
                        button.show();
                        less.hide();
                    }
                    //$(this).children("li:lt('+ numToShow +')").show();
                    list.slice(0, numToShow).show();
                });

                $('button.next-btn').click(function () {
                    var list = $(this).siblings(".list").children("li");
                    var numInList = list.length;
                    var showing = list.filter(':visible').length;
                    list.slice(showing - 1, showing + 100).show();
                    var nowShowing = list.filter(':visible').length;
                    if (nowShowing >= numInList) {
                        $(this).hide();
                        $(this).next('button.less-btn').show();
                    }
                });

                $('button.less-btn').click(function () {
                    $(this).siblings(".list").children("li").not(':lt(1)').hide();
                    $(this).siblings('button.next-btn').show();
                    $(this).hide();
                });
            }

        })
    }


    const fetchCategory = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}user/service-categories`)
            .then(function (res) {
                if (res.data.status == 1) {
                    setAllCategory(res.data.data)
                } else if (res.data.status == 0) {
                    alert(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.status === 0) {
                    alert(error.response.data.message);
                }
            });
    }

    const getCategoryById = async (id) => {


        setAllService('')
        setCategoryId(id)
        let data = {
            id: id, brandName, modelName, variantName, fuelName
        }

        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/get-service-by-category-id`, data)
            .then(function (res) {
                if (res.data.status == 1) {
                    setAllService(res.data.data)
                }
                setTimeout(() => {

                    if (typeof window !== "undefined") {
                        $(".book-service-btn").on("click", function () {
                            console.log("sdvdsvdsv")
                            $(this).parent().parent().addClass("selected-item");
                        })
                    }

                }, 100);

                setTimeout(() => {
                    if (typeof window !== "undefined") {
                        var numToShow = 1;
                        $(".list li").hide();
                        $('.points-service-pack ul').each(function () {
                            var list = $(this).children("li");
                            var button = $(this).siblings(".next-btn");
                            var less = $(this).siblings('.less-btn');
                            var numInList = list.length;
                            if (numInList > numToShow) {
                                button.show();
                                less.hide();
                            }
                            list.slice(0, numToShow).show();
                        });

                        $('button.next-btn').click(function () {
                            var list = $(this).siblings(".list").children("li");
                            var numInList = list.length;
                            var showing = list.filter(':visible').length;
                            list.slice(showing - 1, showing + 100).show();
                            var nowShowing = list.filter(':visible').length;
                            if (nowShowing >= numInList) {
                                $(this).hide();
                                $(this).next('button.less-btn').show();
                            }
                        });

                        $('button.less-btn').click(function () {
                            $(this).siblings(".list").children("li").not(':lt(1)').hide();
                            $(this).siblings('button.next-btn').show();
                            $(this).hide();
                        });
                    }

                }, 100)
            })
            .catch(function (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.status === 0) {
                    alert(error.response.data.message);
                }
            });

        setTimeout(() => {
            if (typeof window !== "undefined") {
                var numToShow = 1;
                $(".list li").hide();
                $('.points-service-pack ul').each(function () {
                    var list = $(this).children("li");
                    var button = $(this).siblings(".next-btn");
                    var less = $(this).siblings('.less-btn');
                    var numInList = list.length;
                    if (numInList > numToShow) {
                        button.show();
                        less.hide();
                    }
                    //$(this).children("li:lt('+ numToShow +')").show();
                    list.slice(0, numToShow).show();
                });

                $('button.next-btn').click(function () {
                    var list = $(this).siblings(".list").children("li");
                    var numInList = list.length;
                    var showing = list.filter(':visible').length;
                    list.slice(showing - 1, showing + 100).show();
                    var nowShowing = list.filter(':visible').length;
                    if (nowShowing >= numInList) {
                        $(this).hide();
                        $(this).next('button.less-btn').show();
                    }
                });

                $('button.less-btn').click(function () {
                    $(this).siblings(".list").children("li").not(':lt(1)').hide();
                    $(this).siblings('button.next-btn').show();
                    $(this).hide();
                });
            }

        })

    }

    const closePop = () => {
        var fueltype = document.querySelector('input[type=radio][name=fuel_type]:checked');
        if (fueltype && fueltype.checked === true) {
            fueltype.checked = false;
        }
        setLogin(false)
        setTinyLoader(false)
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
        }
    }
    // console.log(serviceSelectedId)
    const hidePopup = () => {
        setBrandName('')
        setModelName('')
        setVariantName('')
        setFuelName('')
        setOpenSuccessPopup(false)
        setTinyLoader(false)
        document.body.classList.remove('hide-scroll-poup-new');
    }

    const brandList = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}get-brands-sorting`)
            .then(function (res) {
                if (res.data.status == 1) {
                    setBrand(res.data.brands)
                } else if (res.data.status == 0) {
                    alert(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.status === 0) {
                    alert(error.response.data.message);
                }
            });
    }

    const selectModelByBrand = async (Id, brandName) => {
        setBrandName(brandName)
        setCarDetailDataValue(true)
        setBrandId(Id)
        setModel('')
        setVariant('')
        setModelName('')
        setVariantName('')
        setFuelName('')

        await axios.get(`${process.env.NEXT_PUBLIC_URL}model-by-brand-id?id=${Id}`)
            .then(function (res) {
                if (res.data.status == 1) {
                    setModel(res.data.brand_model)
                    openModelDiv()
                    setDivBrand(false)
                } else if (res.data.status == 0) {
                    alert(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.status === 0) {
                    alert(error.response.data.message);
                }
            });

    }

    const fetchVariantsByModel = async (Id, modelName) => {
        setModelName(modelName)
        setModelId(Id)
        setVariant('')
        setVariantName('')
        setFuelName('')
        await axios.get(`${process.env.NEXT_PUBLIC_URL}variant-by-model-id?id=${Id}`)
            .then(function (res) {
                if (res.data.status == 1) {
                    setVariant(res.data.model_variant)
                    openVariantDiv()
                    setDivModel(false)
                } else if (res.data.status == 0) {
                    alert(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.status === 0) {
                    alert(error.response.data.message);
                }
            });
    }

    const selectVariant = (id, variantName) => {
        setVariantName(variantName)
        setVariantId(id)
        setDivFuel(false)
        openDivFuel()
        setDivVariant(false)
    }

    const saveDataAfterLogin = async () => {
        let formDatas = {
            brand_name: brandName,
            model_name: modelName,
            variant_name: variantName,
            fuel_type: fuelName,
            sevice_category_id: categoryId
        }
        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
            setLogin(false)
            await axios.post(`${process.env.NEXT_PUBLIC_URL}user/save-user-service`, formDatas, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
                }
            })
                .then(function (res) {
                    if (res.data.status == 1) {
                        setTinyLoader(false);
                        router.push(`/service/service-details?detailId=${res.data.insertId}`);

                    }
                })
                .catch(function (e) {
                    setTinyLoader(false)
                    if (e && e.message) {
                        setCallErrorMessage(e.message)
                    } else if (e && e.response.data.status === 0) {
                        setCallErrorMessage(e.response.data.message);
                    } else if (e && e.response.data.status === 2) {
                        setCallErrorMessage(e.response.data.message);
                    }
                });
        }
    }
    const selectFuel = async (fuelName) => {
        setFuelName(fuelName)
        let formData = {
            brand_name: brandName,
            model_name: modelName,
            variant_name: variantName,
            fuel_type: fuelName,
            sevice_category_id: categoryId
        }
        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
            setLogin(false)
            let updateUrl = `${process.env.NEXT_PUBLIC_URL}user/update-user-service/${id.detailId}`
            let addUrl = `${process.env.NEXT_PUBLIC_URL}user/save-user-service`

            if (id != undefined && id.detailId || orderId) {
                await axios.post(updateUrl, formData, {
                    headers: {
                        'Content-type': 'application/json',
                        'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
                    }
                }).then(function (res) {

                    if (res.data.status == 1) {
                        // alert('ok')
                        setTinyLoader(false);
                        setDivEdit(true)
                        fetchServiceByCarDetail(categoryId, brandName, modelName, variantName, fuelName)
                        setDisabledBookBtn(false)
                        setDivBrand(false)
                        setDivModel(false)
                        setDivVariant(false)
                        setDivFuel(false)
                        router.push(`/service/service-details?detailId=${id.detailId}`);
                    }
                }).catch(function (error) {

                    console.log(error)

                });
            }
            else {
                await axios.post(addUrl, formData, {
                    headers: {
                        'Content-type': 'application/json',
                        'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
                    }
                }).then(function (res) {

                    if (res.data.status == 1) {
                        setTinyLoader(false);
                        setDivEdit(true)
                        setOrderId(res.data.insertId)
                        fetchServiceByCarDetail(categoryId, brandName, modelName, variantName, fuelName)
                        setDisabledBookBtn(false)
                        setDivBrand(false)
                        setDivModel(false)
                        setDivVariant(false)
                        setDivFuel(false)
                        router.push(`/service/service-details?detailId=${res.data.insertId}`);
                    }
                }).catch(function (error) {
                    console.log(error)

                });
            }

        } else {
            setLogin(true)
        }
    }
    // console.log("brand", brandName)
    const editCarInfo = (e) => {
        e.preventDefault();
        setCarDetailData();
        setCarDetailDataValue(false)
        setBrandName('')
        setModelName('')
        setVariantName('')
        setFuelName('')
        var brandSelected = document.querySelector('input[type=radio][name=brand_name]:checked');
        if (brandSelected && brandSelected.checked === true) {

            brandSelected.checked = false;
        }

        var modelSelected = document.querySelector('input[type=radio][name=model_name]:checked');
        if (modelSelected && modelSelected.checked === true) {
            modelSelected.checked = false;
        }

        var varaintSelected = document.querySelector('input[type=radio][name=variant_name]:checked');
        if (varaintSelected && varaintSelected.checked === true) {
            varaintSelected.checked = false;
        }

        var fueltype = document.querySelector('input[type=radio][name=fuel_type]:checked');
        if (fueltype && fueltype.checked === true) {
            fueltype.checked = false;
        }

        setDivBrand(true)
        setDivEdit(false)
        setDivModel(false)
        setDivVariant(false)
        setDivFuel(false)
        setDisabledBookBtn(true)
        setOrderSummaryDiv(false)
        setShortSummaryDiv(true)
    }

    const openBrandDiv = () => {
        var radio = document.querySelector('input[type=radio][name=brand_name]:checked');
        if (radio && radio.checked === true) {
            radio.checked = false;
        }
        setBrandName('')
        setModelName('')
        setVariantName('')
        setFuelName('')
        setDivBrand(true)
        setDivEdit(false)
        setDivModel(false)
        setDivVariant(false)
        setDivFuel(false)
    }

    const openModelDiv = () => {
        var modelSelected = document.querySelector('input[type=radio][name=model_name]:checked');
        if (modelSelected && modelSelected.checked === true) {
            modelSelected.checked = false;
        }
        setModelName('')
        setVariantName('')
        setFuelName('')
        setDivModel(true)
        setDivBrand(false)
        setDivVariant(false)
        setDivFuel(false)
    }

    const openVariantDiv = () => {
        var varaintSelected = document.querySelector('input[type=radio][name=variant_name]:checked');
        if (varaintSelected && varaintSelected.checked === true) {
            varaintSelected.checked = false;
        }
        setVariantName('')
        setFuelName('')
        setDivVariant(true)
        setDivBrand(false)
        setDivModel(false)
        setDivFuel(false)
    }

    const openDivFuel = () => {
        setDivFuel(true)
        setDivBrand(false)
        setDivModel(false)
        setDivVariant(false)
    }

    const selectService = async (service_id, data) => {
        setServiceSelectedId([...serviceSelectedId, service_id])
        setSelectedServiceId(service_id)
        setOrderId(id != undefined && id.detailId)
        const dataa = { ...data, orderId: id != undefined && id.detailId ? id.detailId : orderId }
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/service-add-to-cart`, dataa, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setOrderSummaryDiv(true)
                    setShortSummaryDiv(false)
                    setCarDetailDataValue(true)
                    setSelectedServices(res.data.data)
                    setTotalPrice(res.data.total_price)
                    setGst(res.data.gst)
                    setGrandPrice(res.data.grand_price)

                } else if (res.data.status == 0) {
                    alert(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.status === 0) {
                    alert(error.response.data.message);
                }
            });
    }

    const removeToCart = async (id, servId) => {
        // console.log("id", id, "Ser", servId)
        if (typeof window !== "undefined" && selectedServices.length > 0) {
            selectedServices !== undefined && selectedServices.map((disc, i) => {
                // console.log("dis", disc.service_id)
                // console.log(disc.service_id === servId)
                if (disc.service_id === servId) {
                    // alert(disc.service_id)
                    $(`.${disc.service_id}`).parent().parent().removeClass("selected-item");
                } else {

                }
            });

        }
        await axios.get(`${process.env.NEXT_PUBLIC_URL}user/service-remove-to-cart/${id}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                console.log(res.data.status)
                if (res.data.status == 1) {
                    setSelectedServices(res.data.data)
                    setTotalPrice(res.data.total_price)
                    setGst(res.data.gst)
                    setGrandPrice(res.data.grand_price)
                }
            })
            .catch(function (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.status === 0) {
                    setOrderSummaryDiv(false)
                    setShortSummaryDiv(true)
                    setSelectedServices('')
                    setTotalPrice(0)
                    setGrandPrice(0)
                    setGst(0)
                }
            });
    }

    const checkOutToProccedBtn = async () => {
        const formData = {
            'step_form': 2,
            'service_id': selectedServiceId
        }
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-user-service/${orderId != undefined ? orderId : id != undefined ? id.detailId : ''}`, formData, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setTinyLoader(false);
                    router.push(`/service/${orderId != undefined ? orderId : id != undefined ? id.detailId : ''}`);
                }
            })
            .catch(function (e) {
                setTinyLoader(false)
                console.log(e)
            });

    }

    useEffect(() => {
        fetchCategory()
        brandList()
        if (typeof window !== "undefined") {
            console.log(localStorage.getItem('categoryId'))
            localStorage.getItem('categoryId')
        }
        axios.get(`${process.env.NEXT_PUBLIC_URL}user/edit-user-service?id=${id != undefined && id.detailId}`, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {

            if (res && res.data.status === 1) {
                setDivBrand(false)
                console.log("Text Data", res.data.data.sevice_category_id)
                setCarDetailData(res.data.data)
                setCarDetailDataValue(true)
                setBrandName(res.data.data.brand_name)
                setModelName(res.data.data.model_name)
                setVariantName(res.data.data.variant_name)
                setFuelName(res.data.data.fuel_type)
                setCategoryId(res.data.data.sevice_category_id)
                setDisabledBookBtn(false)
                if (res.data.data.sevice_category_id && res.data.data.brand_name && res.data.data.model_name && res.data.data.variant_name && res.data.data.fuel_type) {
                    fetchServiceByCarDetail(res.data.data.sevice_category_id, res.data.data.brand_name, res.data.data.model_name, res.data.data.variant_name, res.data.data.fuel_type)
                }

            }
        }).catch((e) => {
            setCarDetailDataValue(false)
            if (e && e.response.data === 0) {
                alert(e.response.data.message);
            } else if (e && e.response.data.status === 2) {

            }
        });


        if (typeof window !== "undefined" ? localStorage.getItem('categoryId') : false) {
            getCategoryById(localStorage.getItem('categoryId'))
        }


        setTimeout(() => {
            if (typeof window !== "undefined") {
                var numToShow = 1;
                $(".list li").hide();
                $('.points-service-pack ul').each(function () {
                    var list = $(this).children("li");
                    var button = $(this).siblings(".next-btn");
                    var less = $(this).siblings('.less-btn');
                    var numInList = list.length;
                    if (numInList > numToShow) {
                        button.show();
                        less.hide();
                    }
                    //$(this).children("li:lt('+ numToShow +')").show();
                    list.slice(0, numToShow).show();
                });

                $('button.next-btn').click(function () {
                    var list = $(this).siblings(".list").children("li");
                    var numInList = list.length;
                    var showing = list.filter(':visible').length;
                    list.slice(showing - 1, showing + 100).show();
                    var nowShowing = list.filter(':visible').length;
                    if (nowShowing >= numInList) {
                        $(this).hide();
                        $(this).next('button.less-btn').show();
                    }
                });

                $('button.less-btn').click(function () {
                    $(this).siblings(".list").children("li").not(':lt(1)').hide();
                    $(this).siblings('button.next-btn').show();
                    $(this).hide();
                });
            }

        })


    }, [id, id.id, demoId, id.detailId, typeof window !== "undefined" ? localStorage.getItem("categoryId") : false, typeof window !== "undefined" ? localStorage.getItem("IndexId") : false])

    const swiperSettingBrand = {
        slidesPerView: 7,
        spaceBetween: 20,
        loop: false,
        // allowTouchMove: false,
        initialSlide: activeSlide,
        modules: [Navigation],
        breakpoints: {
            1200: {
                slidesPerView: 5,
                spaceBetween: 20,

            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },

            391: {
                slidesPerView: 3.5,
                spaceBetween: 15,
            },

            200: {
                slidesPerView: 2.5,
                spaceBetween: 15,
            },


        }
    }

    if (typeof window !== "undefined") {
        $(".book-service-btn").on("click", function () {

            $(this).parent().parent().addClass("selected-item");
        })
    }

    return (
        <>
            <WebHead pageTitle="Service Details" />
            <section className="package-service">
                <div className='extra-pd-rightleft'>
                    <div className="wrapper">
                        <section className="sevice-filter-cat sticky-div mobile-style">
                            <div className="wrapper sticky-div">
                                <ul>
                                    <Swiper {...swiperSettingBrand} navigation pagination={{ clickable: true }}>

                                        {allCategory && allCategory.map((categories, i) => {
                                            return (
                                                <SwiperSlide key={i}>
                                                    <li className={`${categoryId === categories._id ? 'active-cat' : ''}`}>
                                                        <div className='all-item-center'>
                                                            <Link href="" onClick={() => getCategoryById(categories._id)}></Link>
                                                            <div className="icon-center">
                                                                <img src={`${process.env.NEXT_PUBLIC_URL}${categories.image}`} />
                                                            </div>
                                                            <p>{categories.name}</p>
                                                        </div>

                                                    </li>
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                </ul>
                            </div>

                        </section>

                        <div className="row">
                            <div className="col-md-7">

                                <div className="nextstep">
                                    <div className='formbx-white p-0 desktop-hide-div border-mobile mobile-show-div bottom-gap'>
                                        <div className='border-heading relativediv'>
                                            <h3>Vehicle Details</h3>
                                            <div className='editcta' onClick={() => editCarInfo()}>Edit</div>
                                        </div>
                                        <div className='vehicle-list-detail'>
                                            <ul>
                                                {brandName ? <li>Brand<span>{brandName}</span></li> : ''}
                                                {modelName ? <li>Model<span>{modelName}</span></li> : ''}
                                                {variantName ? <li>Variant<span>{variantName}</span></li> : ''}
                                                {fuelName ? <li>Fuel<span>{fuelName}</span></li> : ''}
                                            </ul>
                                        </div>
                                    </div>

                                </div>

                                <section className="sevice-filter-cat sticky-div desktop-style">

                                    <div className="wrapper sticky-div">
                                        <ul>
                                            <Swiper {...swiperSettingBrand} navigation pagination={{ clickable: true }}>

                                                {allCategory && allCategory.map((categories, i) => {
                                                    return (
                                                        <SwiperSlide key={i}>
                                                            <input type="hidden" defaultValue={categories._id} id="cate_id" />
                                                            <li className={`${categoryId === categories._id ? 'active-cat' : ''}`} onClick={() => getCategoryById(categories._id)}>
                                                                <div className='all-item-center'>
                                                                    {/* <Link href=""></Link> */}
                                                                    <div className="icon-center">
                                                                        <img src={`${process.env.NEXT_PUBLIC_URL}${categories.image}`} />
                                                                    </div>
                                                                    <p>{categories.name}</p>
                                                                </div>

                                                            </li>
                                                        </SwiperSlide>
                                                    )
                                                })}
                                            </Swiper>
                                        </ul>
                                    </div>
                                </section>


                                {allService && allService.length > 0 ? allService.map((service, i) => {
                                    return (
                                        <div className="package-bx" key={i}>
                                            <div className="package-tag">{service.service_taken_hours ? service.service_taken_hours : service.service_sub_category_id ? service.service_sub_category_id.service_taken_hours : ''} HRS Taken</div>

                                            <div className="service-headingbx">
                                                {service.discount && service.discount != 0 ? <div className='save-price'>Save INR {service.discount}/- if you buy today</div> : <div>&nbsp;</div>}

                                                <div className="row service-mob">
                                                    <div className="col-md-9">
                                                        <h3>{service.service_sub_category_name ? service.service_sub_category_name : service.service_sub_category_id ? service.service_sub_category_id.service_sub_category_name : ''}</h3>

                                                        <div dangerouslySetInnerHTML={{ __html: service.service_short_description ? service.service_short_description : service.service_sub_category ? service.service_sub_category.service_short_description : '' }}></div>
                                                    </div>

                                                    <div className="col-md-3 d-flex align-items-end">
                                                        <div className="carcare-price text-end">
                                                            <div className="price-new">{service.grossAmount && service.grossAmount != 0 ? 'INR' : ''} {service.grossAmount != 0 ?
                                                                <span>{service.grossAmount ? Number(service.grossAmount).toLocaleString('en-US') : ''}</span> : <span>{Number(service.service_price).toLocaleString('en-Us')}</span>}
                                                            </div>
                                                            {service.grossAmount != 0 ?
                                                                <div className="greycut-price">{service.grossAmount && service.grossAmount != 0 ? 'INR' : ''} {service.service_price ? Number(service.service_price).toLocaleString('en-Us') : ''}
                                                                </div> : ''
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div dangerouslySetInnerHTML={{ __html: service.service_description ? service.service_description : service.service_sub_category_id ? service.service_sub_category_id.service_description : '' }}></div>
                                            <div className='btn-rightspace'>
                                                <button className={`btn reverse-border-btn book-service-btn ${service._id}`} disabled={disabledBookBtn} onClick={() => selectService(service._id, service)}>Select Service</button>

                                                <button className={`btn reverse-border-btn selected ${service._id}`} ><i>Selected</i></button>

                                            </div>


                                        </div>
                                    )
                                }) : <div className='no-data-added'>
                                    <div className='animation-icon'>
                                        <Lottie animationData={EmptyCar} loop={true} />
                                        <span>Data not available.</span>
                                    </div>


                                </div>}
                            </div >

                            <div className="col-md-5 desktop-style">
                                <div className='vehicle-list-detail'>

                                </div>
                                <div className='sticky-div top-180'>
                                    {brandName && carDetailDataValue ?
                                        <div className='formbx-white p-0' style={{ display: brandName ? 'block' : 'false' }}>
                                            <div className='border-heading relativediv'>
                                                <h3>Vehicle Details</h3>
                                                <div className='editcta' onClick={(e) => editCarInfo(e)}>Edit</div>
                                            </div>
                                            <div className='vehicle-list-detail'>
                                                <ul>
                                                    {brandName ? <li>Brand<span>{brandName}</span></li> : ''}
                                                    {modelName ? <li>Model<span>{modelName}</span></li> : ''}
                                                    {variantName ? <li>Variant<span>{variantName}</span></li> : ''}
                                                    {fuelName ? <li>Fuel<span>{fuelName}</span></li> : ''}
                                                </ul>
                                            </div>
                                        </div>
                                        : ''}

                                    {carDetailData ?
                                        <>

                                            <div className='formbx-white book-service text-center' style={{ display: `${shortSummaryDiv === true ? 'block' : 'none'}` }}>
                                                <img src="/img/service-car-icon.svg" alt="" />
                                                <p>Go ahead and book a service for your car.</p>
                                            </div>
                                            <div className="formbx-white service-order-summary pb-0  scroll-summery" style={{ display: orderSummaryDiv === true ? 'block' : 'none' }} >
                                                <h3>Order Summary</h3>
                                                <div className='summarylist p-0'>
                                                    <ul className='data-scroll more-item'>
                                                        {selectedServices && selectedServices.length > 0 ? selectedServices.map((addService, i) => {
                                                            return (
                                                                <>
                                                                    <li key={i}>
                                                                        <div className='left-txt blue-txt-order'>
                                                                            {addService && addService.service_sub_category && addService.service_sub_category.service_sub_category_name}
                                                                            <span dangerouslySetInnerHTML={{ __html: addService && addService.service_sub_category && addService.service_sub_category.service_short_description }}></span>

                                                                            <span>{ } </span>
                                                                        </div>
                                                                        <div className='right-txt blue-txt-order'>
                                                                            INR {addService && addService.service_price ? addService.service_price : ''}/-
                                                                            <br />

                                                                            {/* <span className="price-cut">INR 39,999/-</span> */}
                                                                            <div className='clr'></div>
                                                                            <button className="delete-btn" onClick={() => removeToCart(addService._id, addService.service_id)}> </button>
                                                                        </div>
                                                                    </li>
                                                                </>
                                                            )

                                                        }) : ''}
                                                    </ul>

                                                    <ul className='gap-ul'>
                                                        <li>
                                                            <div className='left-txt'>Pick & Drop</div>
                                                            <div className='right-txt green-txtorder'>Free</div>
                                                        </li>
                                                        <li>
                                                            <div className='left-txt'>Car Wash</div>
                                                            <div className='right-txt green-txtorder'>Free</div>
                                                        </li>
                                                        <li>
                                                            <div className='left-txt'>Car Inspection</div>
                                                            <div className='right-txt green-txtorder'>Free</div>
                                                        </li>
                                                        <li>
                                                            <div className='left-txt'>GST (18%)</div>
                                                            <div className='right-txt green-txtorder'> {gst ? Number(gst).toLocaleString('en-US') : ''}</div>
                                                        </li>
                                                        <li className='grandtotal'>
                                                            <div className='left-txt'>Grand Total</div>
                                                            <div className='right-txt'>INR {grandPrice ? Number(grandPrice).toLocaleString('en-US') : ''}
                                                                /-</div>
                                                        </li>

                                                    </ul>
                                                    <div class="btn-space edge"> <button type='button' onClick={() => checkOutToProccedBtn()} className='btn reverse fullwd-btn'>
                                                        <ButtonSpinner load={tinyLoader} btnName="Proceed To Checkout" />
                                                    </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                        :
                                        <>
                                            <div className='formbx-white p-0 white-spacebtn' style={{ display: `${divBrand === true ? 'block' : 'none'}` }}>
                                                <div className='border-heading'>
                                                    <h3>Select Vehicle Details</h3>
                                                </div>

                                                <h5>  Select Brand</h5>
                                                <div className="car-data">
                                                    <div className="brands-logobx  brands no-after-radio custom-search search-box fule-type">
                                                        {brand && brand.map((brands, i) => {
                                                            return (
                                                                <div className="form-group" key={i}>
                                                                    <input type="radio" id={`brand_${brands.slug}`} name="brand_name" onChange={() => selectModelByBrand(brands._id, brands.name)} defaultValue={brandName ? brandName : ''} />
                                                                    <label htmlFor={`brand_${brands.slug}`}>
                                                                        <img src={`${process.env.NEXT_PUBLIC_URL}${brands.logo}`} />
                                                                        <span>{brands.name}</span>
                                                                    </label>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: `${divModel === true ? 'block' : 'none'}` }} className='formbx-white p-0 white-spacebtn wd-25-form'>
                                                <div className='border-heading'>
                                                    <h3> Select Vehicle Details</h3>
                                                </div>
                                                <h5> <span className='back-step' onClick={() => openBrandDiv()}></span>Select Model</h5>
                                                {/* <div className="srch-model">
                                                    <input type="text" placeholder="Search Model" />
                                                </div> */}
                                                <div className='car-data small-box'>
                                                    <div className="brands brands-logobx">
                                                        {model && model.map((models, i) => {
                                                            return (
                                                                <div className="form-group body-type" key={i}>
                                                                    <input type="radio" name="model_name" id={`model_${models.slug}`} onChange={() => fetchVariantsByModel(models._id, models.name)} defaultValue={modelName ? modelName : ''} required />
                                                                    <label htmlFor={`model_${models.slug}`}>{models.name} </label>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>

                                            </div>

                                            <div style={{ display: `${divVariant === true ? 'block' : 'none'}` }} className='formbx-white p-0 white-spacebtn'>
                                                <div className='border-heading'>
                                                    <h3>Select Vehicle Details</h3>
                                                </div>
                                                <h5> <span className='back-step' onClick={() => openModelDiv()}> </span>Select Variant</h5>
                                                <div className='car-data small-box variant'>
                                                    <div className="brands brands-logobx">
                                                        {variant && variant.map((variants, i) => {
                                                            return (
                                                                <div className="form-group body-type" key={i}>
                                                                    <input type="radio" name="variant_name" id={`variant_${variants.slug}`} onChange={() => selectVariant(variants._id, variants.name)} defaultValue={variantName ? variantName : ''} required />
                                                                    <label htmlFor={`variant_${variants.slug}`}>{variants.name} </label>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>

                                            </div>

                                            <div style={{ display: `${divFuel === true ? 'block' : 'none'}` }} className='formbx-white p-0 white-spacebtn'>
                                                <div className='border-heading'>
                                                    <h3>Select Vehicle Details</h3>
                                                </div>
                                                <h5> <span className='back-step' onClick={() => openVariantDiv()}> </span>Select Fuel Type</h5>
                                                <div className="car-data">
                                                    <div className="brands-logobx  brands no-after-radio custom-search search-box fule-type">
                                                        {Fuel && Fuel.data !== undefined && Fuel.data.fuels.map((fuels, i) => {
                                                            return (
                                                                <div className="form-group" key={fuels._id}>
                                                                    <input type="radio" id={`fuel_${fuels.fuel_slug}`} defaultValue={fuelName ? fuelName : ''} name="fuel_type" onChange={() => selectFuel(fuels.fuel_name)} required />
                                                                    <label htmlFor={`fuel_${fuels.fuel_slug}`}>

                                                                        <img src={`${process.env.NEXT_PUBLIC_URL}${fuels.fuel_image}`} />
                                                                        <span>{fuels.fuel_name}</span>

                                                                    </label>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </>

                                    }

                                    <div style={{ display: `${divEdit === true ? 'block' : 'none'}` }} className="nextstep">
                                        {/* <div className='formbx-white p-0'>
                                            <div className='border-heading relativediv'>
                                                <h3>Vehicle Details</h3>
                                                <div className='editcta' onClick={(e) => editCarInfo(e)}>Edit</div>
                                            </div>
                                            <div className='vehicle-list-detail'>
                                                <ul>
                                                    {brandName ? <li>Brand<span>{brandName}</span></li> : ''}
                                                    {modelName ? <li>Model<span>{modelName}</span></li> : ''}
                                                    {variantName ? <li>Variant<span>{variantName}</span></li> : ''}
                                                    {fuelName ? <li>Fuel<span>{fuelName}</span></li> : ''}
                                                </ul>
                                            </div>
                                        </div> */}

                                        {/* <div className='formbx-white book-service text-center' style={{ display: `${shortSummaryDiv === true ? 'block' : 'none'}` }}>
                                            <img src="/img/service-car-icon.svg" alt="" />
                                            <p>Go ahead and book a service for your car.</p>
                                        </div> */}

                                        {/* <div className="formbx-white service-order-summary pb-0  scroll-summery" style={{ display: orderSummaryDiv === true ? 'block' : 'none' }} >
                                            <h3>Order Summary</h3>
                                            <div className='summarylist p-0'>
                                                <ul className='data-scroll'>
                                                    {
                                                        selectedServices ? selectedServices.map((addService, i) => {
                                                            return (
                                                                <>
                                                                    <li key={i}>
                                                                        <div className='left-txt blue-txt-order'>
                                                                            {addService && addService.service_sub_category && addService.service_sub_category.service_sub_category_name}

                                                                            <span dangerouslySetInnerHTML={{ __html: addService && addService.service_sub_category && addService.service_sub_category.service_short_description }}></span>

                                                                            <span>{ } </span>
                                                                        </div>
                                                                        <div className='right-txt blue-txt-order'>
                                                                            INR {addService && addService.service_price ? addService.service_price : ''}/-
                                                                            <br /><span className="price-cut">INR 39,999/-</span>
                                                                            <div className='clr'></div>
                                                                            <button className="delete-btn" onClick={() => removeToCart(addService._id)}></button>
                                                                        </div>
                                                                    </li>
                                                                </>
                                                            )

                                                        }) : ''}
                                                </ul>

                                                <ul className='gap-ul'>
                                                    <li>
                                                        <div className='left-txt'>Pick & Drop</div>
                                                        <div className='right-txt green-txtorder'>Free</div>
                                                    </li>
                                                    <li>
                                                        <div className='left-txt'>Car Wash</div>
                                                        <div className='right-txt green-txtorder'>Free</div>
                                                    </li>
                                                    <li>
                                                        <div className='left-txt'>Car Inspection</div>
                                                        <div className='right-txt green-txtorder'>Free</div>
                                                    </li>
                                                    <li className='grandtotal'>
                                                        <div className='left-txt'>Grand Total</div>
                                                        <div className='right-txt'>INR
                                                            {totalPrice ? Number(totalPrice).toLocaleString('en-US') : ''}
                                                            /-</div>
                                                    </li>

                                                </ul>
                                                <div class="btn-space edge">   <button type='button' onClick={() => checkOutToProccedBtn()} className='btn reverse fullwd-btn'>
                                                    <ButtonSpinner load={tinyLoader} btnName="Proceed To Checkout" />
                                                </button>
                                                </div> 
                                            </div>
                                        </div> */}
                                    </div >
                                </div >

                            </div >


                            <div className='mobile-fixed-bg mobile-style'>
                                <Link href={'#'} className='schedule-evaluation text-center'>
                                    Select Car
                                </Link>

                                <Link href={'#'} className='schedule-evaluation text-center'>
                                    Proceed To Checkout
                                </Link>
                            </div>
                        </div >
                    </div >
                </div >
            </section >
            <LoginForm Login={Login} logInHeading="Log in" closePop={closePop} submitDataAfterSubmitLogIn={saveDataAfterLogin} redirectRoute={``} loginId={`book-user-services`} />
            {openSuccessPopup ? <SmallSuccessPopUp HidePopup={hidePopup} successMessage={callSuccessMessage} errorMessage={callErrorMessage} /> : ""}
        </ >
    )
}
