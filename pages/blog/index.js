import React, { useEffect, useState, useMemo } from 'react';
import "swiper/css";
import "swiper/css/pagination";
import WebHead from '@/components/common/WebHead';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import axios from 'axios';
import BlogComponent from '@/components/blogs/BlogComponent';
import Link from 'next/link';



function Index() {

	const [blogs, setBlogs] = useState('')

	if (typeof window !== "undefined") {
		document.body.classList.remove('hide-scroll');
	}
	useEffect(() => {
		const blog = async () => axios.get(`${process.env.NEXT_PUBLIC_URL}blogs`).then(function (res) {
			if (res.data.status == 1) {
				setBlogs(res.data.data)
			}
		}).catch(function (error) {
			console.log(error)
		});
		blog()

		if (typeof window !== "undefined") {

			document.body.classList.add('mobile-menu-show');
		}

		return () => {
			if (typeof window !== "undefined") {

				document.body.classList.remove('mobile-menu-show');
			}

		}

	}, [])


	return (
		<>
			<WebHead pageTitle="Blog" />
			{/* <WebsiteLayout> */}
			<div className="home-banner inner-banner news-banner blog-main">
				{blogs ? blogs.slice(0, 1).map((blog, i) => {
					return (
						<>
							<img src={`${process.env.NEXT_PUBLIC_URL}public/blog-post/${blog.blog_image}`} alt={blog.blog_name} />
							<div className='banner-text'>
								<div className='blog-row'>
									<div className='text'>
										<div className='blog-bread'>
											Luxury Ride <span>  {new Date(blog.blog_posted_date).getDate()} {new Date(blog.blog_posted_date).toLocaleDateString('en-IN', { month: 'long' })} {new Date(blog.blog_posted_date).getFullYear()}</span>
										</div>

										<h4>{blog.blog_name}</h4>

										<p>{blog.blog_short_description}</p>

										{/* <div className='tags'>
											{blog.blog_tag && blog.blog_tag.map((tag, i) => {
												return (
													<>
														<span key={i}>{tag.name}</span>
													</>
												)
											})}
										</div> */}

										<Link target='_blank' href={`blog/${blog.blog_slug}`} className="btn center arrow-style blueBdr">Read More</Link>

									</div>

								</div>
							</div>
						</>
					)
				}) : <div className='text'>
					<div className='blog-bread'>
						Luxury Ride <span>21 January 2023</span>
					</div>

					<h4>How To Maintain A Pre-Owned Luxury Car?</h4>

					<p>There is nothing like the feeling of owning a luxury car, be it a used car. The experience of humming down the highway or around the city in the exquisite ride…</p>

					<div className='tags'>

						<a href='#'>Sports Car</a>
						<a href='#'>Best Car</a>
						<a href='#'>New Tag</a>

					</div>

					<a target='_blank' href="blog-detail" className="btn center arrow-style blueBdr">Read More</a>

				</div>}
			</div>

			<div className='wrapper '>
				<div className='blog-list'>
					<BlogComponent blogsList={blogs} />
				</div>

			</div>

			<div className='clr'></div>
			{/* </WebsiteLayout> */}
		</>
	)
}

export default Index
