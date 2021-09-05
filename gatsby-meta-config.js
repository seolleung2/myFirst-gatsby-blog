module.exports = {
  title: `🐻‍❄️TeddyJung's.Dev`,
  description: `테디정의 개발새발 블로그 입니다🍎`,
  author: `[TeddyBearJung]`,
  introduction: `원하는 개발자가 되었지만 생각보다 모르는게 엄청 많아 울코(😭) 중입니다.`,
  siteUrl: `https://dev-seolleung2.netlify.app/`, // Your blog site url
  sitemapPath: `https://dev-seolleung2.netlify.app/sitemap.xml`,
  robotsPolicy: [{ userAgent: '*', allow: '/' }],
  social: {
    twitter: ``, // Your Twitter account
    github: `seolleung2`, // Your GitHub account
    medium: `@seolleung22`, // Your Medium account
    facebook: `dotorimook8808`, // Your Facebook account
    linkedin: ``, // Your LinkedIn account
  },
  icon: `content/assets/felog.png`, // Add your favicon
  keywords: [
    `blog`,
    `devlog`,
    `web`,
    `development`,
    `frontend`,
    `backend`,
    `javascript`,
    `books`,
    `review`,
    `react`,
    `react native`,
  ],
  comment: {
    disqusShortName: '', // Your disqus-short-name. check disqus.com.
    utterances: 'seolleung2/myFirst-gatsby-blog', // Your repository for archive comment
  },
  configs: {
    countOfInitialPost: 10, // Config your initial count of post
  },
  sponsor: {
    buyMeACoffeeId: 'devseolleung',
  },
  share: {
    facebookAppId: '638631253452593', // Add facebookAppId for using facebook share feature v3.2
  },
  ga: '', // Add your google analytics tranking ID
}
