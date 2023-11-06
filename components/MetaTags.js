function MetaTags({ data }) {
    console.log('component data: ', data);
    return (
        <>
            <title>{data && data.data && data.data.blog_name}</title>
            <meta property="og:title" content={`${data && data.data && data.data.blog_name}`} key="og-title" />
            <meta name="twitter:title" content={`${data && data.data && data.data.blog_name}`} key="tw-title" />
            <meta property="og:description" content={`${data && data.data && data.data.blog_description}`} key="og-desc" />
            <meta name="twitter:description" content={`${data && data.data && data.data.blog_description}`} key="tw-desc" />
            <meta property="og:image" content={`${process.env.NEXT_PUBLIC_URL}public/blog-post/${data && data.data && data.data.blog_image}`} key="og-image" />
            <link rel="image_src" href={`${process.env.NEXT_PUBLIC_URL}public/blog-post/${data && data.data && data.data.blog_image}`} />
            <meta itemprop="image" content={`${process.env.NEXT_PUBLIC_URL}public/blog-post/${data && data.data && data.data.blog_image}`} />
            <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_URL}public/blog-post/${data && data.data && data.data.blog_image}`} key="tw-image" />
            <meta name="twitter:card" content="summary_large_image" key="tw-card" />
            <meta name="twitter:url" content={`/blog/${data && data.data && data.data.blog_slug}`} />

        </>
    )
}

export default MetaTags;