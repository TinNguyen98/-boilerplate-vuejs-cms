const date = new Date()

export const COOKIES_KEY = {
  token: 'aeon_cms_token',
  // lasts for 30 days
  expires: new Date(date.setDate(date.getDate() + 30)).toISOString()
}
