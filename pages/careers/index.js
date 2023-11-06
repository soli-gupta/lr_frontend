import React, { useState, useRef, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import "swiper/css";
import "swiper/css/pagination";
import { ParallaxBanner, Parallax, ParallaxBannerLayer } from 'react-scroll-parallax';
import { ParallaxProvider } from 'react-scroll-parallax';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Marquee from "react-fast-marquee";
import WebHead from '@/components/common/WebHead';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import Link from 'next/link';

const fetcher = (url) => axios.get(url).then(res => res.data);

function Index() {

	if (typeof window !== "undefined") {
		document.body.classList.remove('hide-scroll');
	}
	const cmspage = useSWR(`${process.env.NEXT_PUBLIC_URL}cms-page/careers`, fetcher);


	useEffect(() => {

		if (typeof window !== "undefined") {

			document.body.classList.add('sticky-btn-have');
		}





		AOS.init();
		Fancybox.bind('[data-fancybox="gallery"]', {
			//
		});

		if (typeof window !== "undefined") {
			document.body.classList.remove('header-No-Scroll');
		}

		return () => {
			if (typeof window !== "undefined") {

				document.body.classList.remove('sticky-btn-have');
			}

		}


	}, [])

	return (
		<>
			<WebHead pageTitle="Careers" />
			{/* <WebsiteLayout> */}
			<div className="home-banner inner-banner">
				<img src="img/career-banner.png" alt="" className="desktop-banner" />
				<img src="img/career-banner-mobile.png" alt="" className="mobile-banner" />

				<div className="filter-section service-fliter">
					<h2>You Lead the Way. <i>We’ve Got Your Back!</i> </h2>
					<div className='banner-subheading'>Live with passion and purpose every day. At Luxury Ride, we unite to create, lead, and deliver. </div>
					<Link href="https://luxuryride.keka.com/careers/" className="btn center arrow-style blueBdr" target='_blank'>View Openings</Link>
				</div>
			</div>

			<div className="banner-bottom-cta desktop-hide-div mobile-show-div">
				<Link href="https://luxuryride.keka.com/careers/" className="btn arrow-style blue-btn" target='_blank' >View Openings</Link></div>
			<section className='made-simple loan-calculator about'>
				<div className='shadow-text'>
					<Marquee speed="30"> <span>Our Focus</span>  </Marquee>
				</div>
				{cmspage.data !== undefined && cmspage.data.cms_page && <div dangerouslySetInnerHTML={{ __html: cmspage.data.cms_page.content_one }}></div>}
			</section>

			<section className="about-career career-col commonm-gap">
				{/* <div className="wrapper">
						<div className='images'>
							<img data-aos="fade-down" src="img/join-img22.png" alt="" />
							<img className='outside' data-aos="fade-up" src="img/join-img.png" alt="" />
							<img data-aos="fade-right" src="img/join-img1.png" alt="" />
						</div>

						<div className='text'>
							<div className='small-text'>Our Values</div>  <h3> Foundation of<br /> everything we do!</h3>
							<p>Our Values are the foundation of everything we do and every action that we take. They inform how we act and the decisions we make. They guide how we work with clients, stakeholders and each other.</p>
							<ul>
								<li>Integrity <span>- We do what is right</span></li>
								<li>Excellence <span>- We never stop learning and improving</span></li>
								<li>Courage <span>- We think and act boldly</span></li>
								<li>Together <span>- We respect each other & draw strength</span></li>
							</ul>
						</div>
						<img className='right-img' data-aos="fade-left" src="img/join-img3.png" alt="" />
					</div> */}
				{cmspage.data !== undefined && cmspage.data.cms_page && <div dangerouslySetInnerHTML={{ __html: cmspage.data.cms_page.content_two }}></div>}
			</section>

			<ParallaxProvider>
				<ParallaxBanner className="careers-equity mobile-paralax-carrer" style={{ aspectRatio: '2 / 1' }}>
					<ParallaxBannerLayer image="img/equity-banner.png" speed={-5} />
				</ParallaxBanner>
				<div className='about-boxes single'>
					<div className="wrapper">
						<Parallax speed={30} className="slideeffectabout">
							<div className='row'>
								<div className="col-md-5">
									<img className='image-radious desktop-banner' src="img/equity-img.png" alt="" />
									<img className='image-radious mobile-banner' src="img/equity-img-mobile.png" alt="" />
								</div>
								<div className='col-md-7'>
									<div className=' blue-bg'>
										<h2><span> Equity, Inclusion,</span> & Diversity</h2>
										<p>At Luxury Ride, what makes us different is also what makes us stronger. Our efforts to drive inclusion are built on the solid foundation of Our Purpose and Our Values, and an expectation from our people, clients and broader society.</p>

										<p className='no-gap'> We are pushing for a fairer, more-equitable society, a place where everyone can bring their whole selves to work. Your unique experiences and background belong here.</p>
									</div>
								</div>
							</div>
						</Parallax>
					</div>
				</div>

			</ParallaxProvider>
			<section className="why-luxury commonm-gap">
				{cmspage.data !== undefined && cmspage.data.cms_page && <div dangerouslySetInnerHTML={{ __html: cmspage.data.cms_page.content_three }}></div>}
			</section>

			<section className="life-luxury commonm-gap">
				{cmspage.data !== undefined && cmspage.data.cms_page && <div dangerouslySetInnerHTML={{ __html: cmspage.data.cms_page.content_four }}></div>}
			</section>

			<section className="hr-queries-bx commonm-gap">
				<div className="catBanner">
					<div className="wrapper">
						<div className="banrWrap">
							<div className="banrImg"><img src="img/luxury-ride-hr.png" alt="" /></div>
							<div className="banrcontent">
								<h3>Any queries regarding job</h3>
								<h2>Get in touch with our HR.</h2>
								<Link href="tel:7015995517" className="btn white-btn-border"><span>Call HR</span></Link>
								<Link href="mailto:hr@luxuryride.in" className="btn white-btn-border mail-btn"><span>Email HR</span></Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* </WebsiteLayout> */}
		</>

	)
}

export default Index
