'use server'
export const validateRecaptcha = async (token: string | null | undefined) => {
  if (!token) {
    throw new Error('Recaptcha failed: no token provided.')
  }
  const recaptchaResponse = await fetch(
    `https://recaptchaenterprise.googleapis.com/v1/projects/onward-real-esta-1751297843955/assessments?key=${String(
      process.env.GOOGLE_API_KEY,
    )}`,
    {
      method: 'POST',
      body: JSON.stringify({
        event: {
          token: token,
          expectedAction: 'form_submit',
          siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        },
      }),
    },
  )
  const recaptchaData = await recaptchaResponse.json()

  if (!recaptchaData?.riskAnalysis?.score || recaptchaData?.tokenProperties?.valid !== true) {
    console.log('Recaptcha failed', JSON.stringify(recaptchaData, null, 2))
    throw new Error('Recaptcha failed')
  }
  return { recaptcha_valid: recaptchaData?.tokenProperties?.valid }
}
