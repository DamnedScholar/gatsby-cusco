import React from "react";
import {Helmet} from "react-helmet";

// OpenGraph: http://opengraphprotocol.org
// Twitter Cards: https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started
// https://blog.bufferapp.com/twitter-cards-guide

class SocialObject extends React.Component {
	render () {
		const {handle, authorHandle, url, title, description, contentType, contentUrl contentWidth, contentHeight, locale, siteName} = this.props
		let creator
		let content, secureUrl, secureTag, widthTag, heightTag, altTag
		
		if (author)
			creator = authorHandle
		else
			creator = handle
		
		if (contentUrl.startsWith('http:'))
			secureUrl = contentUrl.slice(0, 4) + "s" + contentUrl.slice(4)
		else
			secureUrl = contentUrl
		
		switch (contentType) {
			case "image":
				content = <meta property="og:image" content={contentUrl} />
				secureTag = <meta property="og:image:secure_url" content={secureUrl} />
				widthTag = <meta property="og:image:width" content={contentWidth} />
				heightTag = <meta property="og:image:height" content={contentHeight} />
				altTag = <meta property="og:image:alt" content={title} />
			case "video":
				content = <meta property="og:video" content={contentUrl} />
				secureTag = <meta property="og:video:secure_url" content={secureUrl} />
				widthTag = <meta property="og:video:width" content={contentWidth} />
				heightTag = <meta property="og:video:height" content={contentHeight} />
				altTag = null
			case "audio":
				content = <meta property="og:audio" content={contentUrl} />
				secureTag = <meta property="og:audio:secure_url" content={secureUrl} />
				widthTag = null
				heightTag = null
				altTag = null
		}
			
		return (
			<Helmet>
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:site" content={handle} />
				<meta name="twitter:creator" content={creator} />
				<meta property="og:url" content={url} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				{content}
				{secureTag}
				{widthTag}
				{heightTag}
				{altTag}
				<meta property="og:locale" content={locale} />
				<meta property="og:site_name" content={siteName} />
			</Helmet>
		);
	}
};